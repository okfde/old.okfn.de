---
author:
- Michael Peters
date: 2017-04-04 09:00:00
image:
  src: /files/blog/2017/03/Subsidystory.png
  title: Subsidystories
  license: CC BY 2.0
  license_url:
tags:
- EU
- Open Data
- Transparenz
- Open Government
type: post
layout: post
card: true
published: true

title: "Turning European Subsidy Data into Open Data"
---
For our new website subsidystories.eu [SubsidyStories.eu](http://subsidystories.eu/) we collected all European Structural and Investment Funds (ESIF) beneficiary data from all 28 EU member states and turned it into actual Open Data. Subsidystories.eu is a tool that enables the user to visualize, analyze and compare subsidy data across the European Union thereby enhancing transparency and accountability in Europe. Here we want to go into detail on the difficulties we encountered obtaining, cleaning  and standardising the data and thereby turning it into Open Data. 

So how do EU subsidies work anyways? The EU spends about 638 billion (59%) of its 1082 billion Euro budget for the 2014-2020 funding period on the ESIF funds, basically redistributing the money back to the member states, which then fund local beneficiaries for projects. EU regulations oblige the member states to publish the beneficiary data online - showing what projects are financed to what extent. Ideally this could be found on one central EU website, however, being the EU, the data is published in country (and region) specific portals run by the member states. 

### A scraper’s nightmare: different websites and data formats for every member state 

The variety in how the data is published throughout the European Union is astonishing. Some countries publish information on all three relevant ESIF Funds (ERDF, ESF, CF) in one online portal, while others have separate websites distinguished by funds. Germany provides the most severe case of scatteredness, not only is the data published by its regions (Germany’s 16 federal states), but different websites for distinct funds exist (ERDF vs. ESF) leading to a total of 27 German websites. Arguably making the German data collection just as tedious as collecting all data for the entire rest of the EU. 

![Data Formats](/files/blog/2017/03/data-formats-subsidy.png "Data Formats")
  
Once the distinct websites were located through online searches, the data collection began. Unfortunately, datasets for the 2007-2013 period were rarely available in open formats (counting csv, json or xlsx) and we had to deal with a large amount of PDFs (51) and webapps (15) out of a total of 122 files. The majority of PDF files was extracted using Tabula and OpenRefine (for cleaning misaligned data), others were rather tricky and required specifically tailored scripts by our developer. 

### Open data: political reluctance or technical ignorance?

Even worse were webapps such as this french webapp illustrating their 2007-2013 ESIF projects. While the idea of depicting the beneficiary data on a map may seem smart, it makes the data useless. These webapps do not allow for any kind of analysis and make it very difficult to retrieve the underlying information. Data had to be scraped by our developer and was extremely tedious for these webapps. 

The EU has made efforts to increase the use of open data with their new regulation in December 2013 that mandates the member states to publish their beneficiary data in an open format (CSV, XLSX). Furthermore, they are required to disclose a given list of variables ideally making beneficiary data more comparable. While publication in open data formats has increased henceforth, PDFs and webapps remain an obstacle. Detailed information on where the different member states rank regarding their Open Data can be found [here](http://openbudgets.eu/assets/resources/Report-OpenBudgets-ESIF%20Data-Quality-Index.pdf). 
