#!/usr/bin/env ruby

require "fileutils"
require "json"
require "pathname"
require "yaml"

ROOT = Pathname.new(__dir__).join("..").expand_path.freeze
OUTPUT = Pathname.new(ARGV.fetch(0, "_site")).expand_path(ROOT).freeze
SITE_SOURCE = ROOT.join("site").freeze
ART_SOURCE = ROOT.join("art").freeze

unless OUTPUT.to_s.start_with?("#{ROOT}/") && OUTPUT != ROOT
  abort "Refusing to write outside the repository: #{OUTPUT}"
end

CHARACTER_NAMES = {
  "aya-shameimaru" => "Aya Shameimaru",
  "cirno" => "Cirno",
  "marisa-kirisame" => "Marisa Kirisame",
  "reimu-hakurei" => "Reimu Hakurei",
  "yukari-yakumo" => "Yukari Yakumo"
}.freeze

def display_width(line)
  line.each_codepoint.sum do |codepoint|
    next 0 if (0x0300..0x036F).cover?(codepoint)

    wide =
      (0x1100..0x115F).cover?(codepoint) ||
      (0x2329..0x232A).cover?(codepoint) ||
      (0x2E80..0xA4CF).cover?(codepoint) ||
      (0xAC00..0xD7A3).cover?(codepoint) ||
      (0xF900..0xFAFF).cover?(codepoint) ||
      (0xFE10..0xFE19).cover?(codepoint) ||
      (0xFE30..0xFE6F).cover?(codepoint) ||
      (0xFF00..0xFF60).cover?(codepoint) ||
      (0xFFE0..0xFFE6).cover?(codepoint) ||
      (0x1F300..0x1FAFF).cover?(codepoint)

    wide ? 2 : 1
  end
end

def require_fields!(metadata, fields, path)
  missing = fields.reject { |field| metadata.key?(field) }
  abort "Missing #{missing.join(', ')} in #{path.relative_path_from(ROOT)}" unless missing.empty?
end

FileUtils.rm_rf(OUTPUT)
FileUtils.mkdir_p(OUTPUT)
FileUtils.cp_r(SITE_SOURCE.children, OUTPUT)
FileUtils.mkdir_p(OUTPUT.join("data"))

entries = Dir.glob(ART_SOURCE.join("**/metadata.yaml")).sort.map do |metadata_name|
  metadata_path = Pathname.new(metadata_name)
  work_dir = metadata_path.dirname
  art_path = work_dir.join("art.txt")
  abort "Missing art.txt beside #{metadata_path.relative_path_from(ROOT)}" unless art_path.file?

  metadata = YAML.safe_load(metadata_path.read, permitted_classes: [], aliases: false)
  require_fields!(metadata, %w[title description category subjects artists canvas charset tags license], metadata_path)

  artwork = art_path.read
  abort "Tabs are not allowed in #{art_path.relative_path_from(ROOT)}" if artwork.include?("\t")
  abort "ANSI escape codes are not allowed in #{art_path.relative_path_from(ROOT)}" if artwork.include?("\e")

  lines = artwork.lines(chomp: true)
  measured_width = lines.map { |line| display_width(line) }.max || 0
  measured_height = lines.length
  declared_width = metadata.dig("canvas", "width")
  declared_height = metadata.dig("canvas", "height")

  unless [declared_width, declared_height] == [measured_width, measured_height]
    abort "Canvas mismatch in #{metadata_path.relative_path_from(ROOT)}: " \
          "declared #{declared_width}x#{declared_height}, measured #{measured_width}x#{measured_height}"
  end

  relative_dir = work_dir.relative_path_from(ART_SOURCE)
  parts = relative_dir.each_filename.to_a
  character_slug = metadata.fetch("subjects").first
  destination = OUTPUT.join("art", relative_dir)
  FileUtils.mkdir_p(destination)
  FileUtils.cp(art_path, destination.join("art.txt"))

  {
    "id" => parts.join("/"),
    "title" => metadata.fetch("title"),
    "description" => metadata.fetch("description"),
    "category" => metadata.fetch("category"),
    "character" => character_slug,
    "character_name" => CHARACTER_NAMES.fetch(character_slug, character_slug.split("-").map(&:capitalize).join(" ")),
    "artists" => metadata.fetch("artists"),
    "canvas" => metadata.fetch("canvas"),
    "charset" => metadata.fetch("charset"),
    "color_mode" => metadata.fetch("color_mode", "plain"),
    "animated" => metadata.fetch("animated", false),
    "tags" => metadata.fetch("tags"),
    "license" => metadata.fetch("license"),
    "art_url" => "./art/#{relative_dir}/art.txt",
    "repository_url" => "https://github.com/N0zoM1z0/touhou-ascii-art/tree/main/art/#{relative_dir}"
  }
end

entries.sort_by! { |entry| [entry.fetch("character_name"), entry.fetch("title")] }
OUTPUT.join("data/gallery.json").write(JSON.pretty_generate(entries) + "\n")

puts "Built #{entries.length} works into #{OUTPUT.relative_path_from(ROOT)}"
