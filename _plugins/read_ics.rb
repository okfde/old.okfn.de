module Jekyll
  require 'selene'
  require 'icalendar'
  require 'json'

  class ICSDataReader < Generator
    def generate(site)
      dir = "_ics"
      base = File.join(site.source, dir)
      return unless File.directory?(base) && (!site.safe || !File.symlink?(base))
      entries = Dir.chdir(base) { Dir['*.ics'] }
      entries.delete_if { |e| File.directory?(File.join(base, e)) }
      entries.each do |entry|
        path = File.join(site.source, dir, entry)
        next if File.symlink?(path) && site.safe
        key = sanitize_filename(File.basename(entry, '.*'))
        #ical = Selene.parse(File.read(path))

        event_file = File.open(path)
        events = Icalendar::Event.parse(event_file)

        eventhash = [];
        events.each do |event|
            e = {
                 "dtstart" => "#{event.dtstart}",
                 "dtend" => "#{event.dtend}",
                 "tzid" => "#{event.dtstart.ical_params['tzid']}",
                 "organizer" => "#{event.organizer}",
                 "description" => "#{event.description}",
                 "summary" => "#{event.summary}",
                 "url" => "#{event.url}",
                 "location" => "#{event.location}",
                 "geo" => "#{event.geo}"
            }
            eventhash.push(e)
        end
        ics_data = Hash.new
        ics_data[key] = eventhash;
        site.data.merge!(ics_data)
      end
    end

    private

    # copied from Jekyll
    def sanitize_filename(name)
      name = name.gsub(/[^\w\s_-]+/, '')
      name = name.gsub(/(^|\b\s)\s+($|\s?\b)/, '\\1\\2')
      name = name.gsub(/\s+/, '_')
    end
  end
end
