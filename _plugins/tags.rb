require 'jekyll/tagging'

module Jekyll
  module Tagify
    def tagify(text)
        text.to_s.replace_diacritics.downcase.gsub(/\s/, '-')
    end
  end
end

Liquid::Template.register_filter(Jekyll::Tagify)