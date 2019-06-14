# mav-embed

[![NPM Version](https://img.shields.io/npm/v/@dvl-fw/mav-embed.svg)](https://www.npmjs.com/package/@dvl-fw/mav-embed)
[![Shipping faster with ZenHub](https://img.shields.io/badge/Shipping_faster_with-ZenHub-5e60ba.svg?style=flat-square)](https://app.zenhub.com/workspace/o/cns-iu/make-a-vis)
[![Build Status](https://travis-ci.com/cns-iu/make-a-vis.svg?branch=master)](https://travis-ci.com/cns-iu/make-a-vis)
[![GitHub last commit](https://img.shields.io/github/last-commit/cns-iu/make-a-vis.svg)](https://github.com/cns-iu/make-a-vis/commits/master)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](LICENSE)
[![View Demo](https://img.shields.io/badge/demo-online-brightgreen.svg)](https://cns-iu.github.io/make-a-vis)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?branch=master&project=cns-iu_make-a-vis&metric=alert_status)](https://sonarcloud.io/dashboard?id=cns-iu_make-a-vis&branch=master)
[![Documentation Status](https://make-a-vis.netlify.com/docs/images/coverage-badge-documentation.svg)](https://cns-iu.github.io/make-a-vis/docs/)

Web Components for embedding DVL-FW and Make-A-Vis visualizations.

## Change Log

See the [ChangeLog](https://github.com/cns-iu/make-a-vis/blob/master/CHANGELOG.md) for the latest developments.

## Usage

### Basic embedding

```html
<!doctype html>
<html lang="en">

<!-- The containing element must have a non-percentage height -->
<body style="height: 100vh">
  <!-- Add mav-embed javascript bundle -->
  <script src="https://cdn.jsdelivr.net/npm/@dvl-fw/mav-embed/main-es5.js" nomodule></script>
  <script src="https://cdn.jsdelivr.net/npm/@dvl-fw/mav-embed/main-es2015.js" type="module"></script>

  <!-- Add a project -->
  <mav-project id="proj1" href="path/to/project.yml"></mav-project>

  <!-- Add a visualization referencing the project -->
  <mav-visualization project="#proj1" index="0"></mav-visualization>
</body>
</html>
```

### Embedded using bl.ocks.org

See <https://bl.ocks.org/bherr2/2e3e6c999575fe0fcd6cfaab42020e1b>.

## Credits

Make-a-Vis is developed at the [Cyberinfrastructure for Network Science Center at Indiana University](http://cns.iu.edu/)
