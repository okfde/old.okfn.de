module Jekyll
  module SortedForImpl
    def render(context)
      sorted_collection = collection_to_sort context
      return if sorted_collection.empty?
      i = sorted_collection.first

      sorted_collection.sort_by! { |i| i.downcase }

      original_name = @collection_name
      result = nil
      context.stack do
        sorted_collection_name = "#{@collection_name}_sorted".sub('.', '_')
        context[sorted_collection_name] = sorted_collection
        @collection_name = sorted_collection_name
        result = super
        @collection_name = original_name
      end
      result
    end
  end

  class SortedForTag < Liquid::For
    include SortedForImpl

    def collection_to_sort(context)
      return @collection_name.evaluate(context).dup
    end

    def end_tag
      'endsorted_for'
    end
  end

  class SortedKeysForTag < Liquid::For
    include SortedForImpl

    def collection_to_sort(context)
      return @collection_name.evaluate(context).keys
    end

    def end_tag
      'endsorted_keys_for'
    end
  end
end

Liquid::Template.register_tag('sorted_for', Jekyll::SortedForTag)
Liquid::Template.register_tag('sorted_keys_for', Jekyll::SortedKeysForTag)