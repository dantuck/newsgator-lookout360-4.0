newsgator-lookout360-4.0
========================

NewsGator Social Sites Lookout360 implementation for 4.0

## Features

## Usage

Default usage:

```js
<script src="javascripts/ngRibbonAutoLoader.min.js"></script>
  
<!-- required for <= 4.0.86 -->
<script src="javascripts/ngPatch.min.js"></script>
<!-- END required for <= 4.0.86 -->

<script type="text/javascript">
	var registerNgRibbon = {
	  cacheKey: "634934240492550040"
	  , ribbonOptions: { 
	  	ribbon: '<div class="ngLookout360 ngRibbon" id="ngLookout360"></div>'
	  	, fixedPosition: true
	    , backgroundColor: '#8bbc1d'
	    , fontColor: '#ffffff'
	    , baseFontSize: '8pt'
	    , lookoutUrl: 'https://engage.newsgator.com/my/site/Lookout.aspx'
	    , contextUrl: 'https://engage.newsgator.com'
	    , titleFontFamily: "'Segoe UI', Segoe, Tahoma, Helvetica, Arial, sans-serif"
	    , titleFontSize: '1.4em'
	    //, title: 'Title'
	    //, titleTooltip: 'Open {0}'
	    //, postTooltip: 'Post to Lookout'
	    , tileContainerWidth: '400px'
	    , tileRefreshInterval: 120000
	    , enablePost: true
	    , additionalLinks: {
	      "Engage": {
	        "target": "_blank",
	        "url": "https://engage.newsgator.com/my/site/Lookout.aspx"
	      },
	      "NewsGator": {
	        "target": "_blank",
	        "url": "http://www.newsgator.com"
	      }
	    }
	    , additionalLinksPosition: 3
	    , additionalLinksWidth: '200px'
	    , additionalLinksFontSize: '1.4em'
	    , additionalLinksMarginTopOffset: '-.4em'
	    , additionalLinksTopOffset: '.3em'
	    , localOverrides: { "fr-fr": { title:"Recherche360", titleTooltip:"{0} Ouvert", postTooltip:"Publier sur Recherche" } }
	    , tileItemMaxCount: 25
	    , tileItemMaxCountCeiling: 50
	    , revealIframeWidthClass: 'w750'
	    , isExternal: true
	    , enablePlaceHolderOnBody: true
	    , enableSearch: false
	    , autoInit: true
	    , defaultLocalization: { 
	      "en-us": { "loading":"Loading", "ribbonPromptAuth":"Authenticate with SocialSites", "ribbonPreventLoading":"Hide on this page" } 
	    }
	  }
	  , target: 'body'
	};

	ngRibbonAutoLoader.init(registerNgRibbon.cacheKey, registerNgRibbon.ribbonOptions, registerNgRibbon.target);
</script>

```