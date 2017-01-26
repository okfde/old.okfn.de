---
layout: page
title: Jobs
menu_jobs: yes
---

{% comment %} 
<!--

Diese Seite nicht per Hand ändern, anstelle einen Blog-Post schreiben und in dessen Kopf die folgenden Felder anlegen
    
jobs:
    - "Titel der Position und andere nützliche Fakten in einer Zeile"


z.B. 

jobs:
    - "Projektassistenz für Edulabs (50%)"
      

Diese Seite wird dann automatisch gefüllt, soll der Eintrag entfernt werden, bitte im entsprechenden Blogpost ändern!


-->
{% endcomment %}

<div class="section jobs">
	<ul class="list-unstyled">
		{% for post in site.posts %}
		{% if post.jobs %}
		{% for job in post.jobs %}
		<li class="job-entry">
		    <a href="{{ site.baseurl }}/{{ post.fullurl }}"><h4>{{ job }}</h4></a>
			<a href="{{ site.baseurl }}/{{ post.fullurl }}">{% t jobs.Informationen %}</a>
		</li>
		{% endfor %}
		{% endif %}
		{% endfor %}
	</ul>
</div>
