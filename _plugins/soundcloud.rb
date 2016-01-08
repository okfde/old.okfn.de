class Soundcloud < Liquid::Tag
  Syntax = /^\s*([^\s]+)(\s+(\d+)\s+(\d+)\s*)?/

  def initialize(tagName, markup, tokens)
    super

    if markup =~ Syntax then
      @id = $1
      @width = 100%
      @height = 166
      if $2.nil? then
      else
          @width = $2.split(' ', 2)[0]
          @height = $2.split(' ', 2)[1]
      end

    else
      raise "No Soundcloud ID provided in the \"soundcloud\" tag"
    end
  end

  def render(context)
    "<iframe width=\"#{@width}\" height=\"#{@height}\" scrolling=\"no\" frameborder=\"no\" src=\"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/#{@id}&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false\"></iframe>"
  end

  Liquid::Template.register_tag "soundcloud", self
end