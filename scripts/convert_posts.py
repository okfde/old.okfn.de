import glob
import re

import yaml
import html2text
from lxml import html

html2text.config.UNICODE_SNOB = 1


BBCODE_RE = re.compile(r'\[\w+(?: \w+="[^"]*")*\](.*)\[/\w+\]', re.U | re.M)
TRAILING_WS = re.compile(r'\s*$')


def ydump(e):
    return yaml.safe_dump(e, allow_unicode=True, default_flow_style=False, encoding='utf-8', width=10000)


def to_md(html):
    h = html2text.HTML2Text()
    h.body_width = 0
    return h.handle(html)


def main():
    # parser = etree.HTMLParser()
    for filename in glob.glob('__posts/*.html'):
        with open(filename) as f:
            lines = f.read().decode('utf-8')
            parts = lines.split('---\n')
            if not parts[2].strip():
                continue

            meta = yaml.load(parts[1])
            if meta['status'] == 'draft':
                continue

            print filename

            meta.pop('meta')
            meta['author'] = meta['author']['display_name']

            root = html.fromstring(parts[2])
            first_image = root.xpath('//img')
            if first_image:
                first_image = first_image[0]
                meta['image'] = {
                    'title': first_image.attrib.get('alt'),
                    'src': first_image.attrib.get('src'),
                }
                parent = first_image.getparent()
                if first_image.tail:
                    parent.replace(first_image, html.etree.ElementBase(first_image.tail))
                else:
                    parent.remove(first_image)
            markdown = to_md(html.tostring(root))
            markdown = BBCODE_RE.sub('\\1', markdown)
            markdown = TRAILING_WS.sub('', markdown)

        md_filename = filename.rsplit('.', 1)
        md_filename[1] = 'markdown'
        md_filename = '.'.join(md_filename)
        md_filename = md_filename.rsplit('/', 1)[1]
        year = md_filename.split('-')[0]
        md_filename = 'blog/_posts/%s/%s' % (year, md_filename)

        with open(md_filename, 'w') as f:
            f.write('---\n')
            f.write(ydump(meta))
            f.write('\n\n---\n\n')
            f.write(markdown.replace('\\-', '-').encode('utf-8'))


if __name__ == '__main__':
    main()
