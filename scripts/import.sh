set -ex

ruby -rubygems -e 'require "jekyll-import";
    JekyllImport::Importers::WordpressDotCom.run({
      "source" => "okfn.xml",
      "no_fetch_images" => true,
      "assets_folder" => "static"
    })'
mkdir -p __posts
rm -r __posts
mv _posts/ __posts
for year in 2010 2011 2012 2013 2014 2015
do
  mkdir -p blog/_posts/${year}
done
find blog/_posts/ -name *.markdown | xargs rm
python scripts/convert_posts.py
