# Changelog

Changelog for Make-a-Vis and DVL-FW.

## 0.18.0 - 2019-09-17

### Added in 0.18.0

- Improved CSV parsing
- Minor graphical updates
- Updated dependencies

## 0.17.0 - 2019-06-14

This is mostly a release to add some minor features and enhancements to be used in other projects.

### Added in 0.17.0

- Added mav-embed which allows people to embed MaV/DVL-FW visualizations (and their legends) in regular html pages (and even React). A couple simple examples are at <https://bl.ocks.org/bherr2>. Note: this feature is currently only supported on evergreen browsers (Chrome and Firefox, but NOT IE11).
- Expanded RawData to support CSV and YAML loading
- RawData can now pull data from external urls and be handled properly by MaV
- The MaV data table can now properly handle streaming data
- The MaV UI responsiveness should be slightly improved
- CSV Template can now load multiple CSV files, for instance to make networks with Nodes and Edges CSV files.
- Removed the blank scatterplot visualization that is created when normally loading CSV from MaV
- Created a reusable component to DVL-FW that allows for creating legends (previously this was only in the MaV UI)
- Added a super-secret way to enabled advanced functionality (MaV Advanced). Pressing 'a', then 'b' toggles it. This is currently a hidden/alpha feature that shows all the available graphic variables available to a visualization rather than the current limited set. This opens up opacity, stroke, and other advanced graphic variables for us. In the future, we may also have hidden/alpha visualizations that are accessible only via MaV Advanced.

## 0.15.0 - 2019-03-15

### Added in 0.15.0

- Added a a download button to the data tables for downloading as .csv
- Added paging to the data tables so that all data can be seen
- Added an offline mode. All features work offline except for sharing. A check is made every two hours to see if there are new updates. If so, a prompt is shown to allow the user to upgrade to latest version.
- An initial documentation site was created. It is available [here](https://make-a-vis.netlify.com/docs/).
- Improved appearance of record streams in the middle column add/edit visualization feature.
- Improved CSS structure of the app.
- ISI and NSF files no longer have to be named .isi or .nsf (respectively) and can remain as .txt or .csv (respectively).
- CSV files can now accept columns formatted as "xxx$$yyy" to create custom DataVariable (xxx) to GraphicVariable (yyy) mappings.
- Bug fixes, unit tests added, and documentation added. Testing and Documentation is a work in progress. Our eventual goal is to get to >90% coverage on both.

## 0.14.1 - 2019-01-17

### Added in 0.14.1

- Minor Bug Fixes

## 0.14.0 - 2019-01-16

### Added in 0.14.0

- Bug Fixes, UI Tweaks, and Stabilization

## 0.13.0 - 2019-01-11

### Added in 0.13.0

- A lot of Bug Fixes, UI Tweaks, and Stabilization

## 0.10.0 - 2019-01-04

### Added in 0.10.0

- Refined legend styling and in general
- Graphic Variable hovering feature added
- Bug fixes, stabilization

### Known issues in 0.10.0

- There are still some bugs/QA to be worked out next week

## 0.9.1 - 2019-01-02

### Added in 0.9.1

- Happy New Year!
- Better functioning add/edit visualization featue
- Bug fixes, stabilization

### Known issues in 0.9.1

- Legend styling needs refined
- Graphic Variable hovering feature is not yet working
- Some styling options are still in process for the add/edit visualization feature

## 0.9.0 - 2018-12-21

### Added in 0.9.0

- A completely redesigned UI
- New Temporal Bar Graph Visualization
- CSV Data Loading Support

## 0.5.0 - 2018-10-22

### Added in 0.5.0

- First release of make-a-vis and dvl-fw!
