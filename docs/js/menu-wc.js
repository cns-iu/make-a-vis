'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">make-a-vis documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="changelog.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CHANGELOG
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-8902f0396bdcab756b80586b67c45204"' : 'data-target="#xs-components-links-module-AppModule-8902f0396bdcab756b80586b67c45204"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-8902f0396bdcab756b80586b67c45204"' :
                                            'id="xs-components-links-module-AppModule-8902f0396bdcab756b80586b67c45204"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppUpdateNotificationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppUpdateNotificationComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-89149d6cc4625e30af594c1c7cf44154-1"' : 'data-target="#xs-components-links-module-AppModule-89149d6cc4625e30af594c1c7cf44154-1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-89149d6cc4625e30af594c1c7cf44154-1"' :
                                            'id="xs-components-links-module-AppModule-89149d6cc4625e30af594c1c7cf44154-1"' }>
                                            <li class="link">
                                                <a href="components/ProjectComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProjectComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VisualizationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">VisualizationComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ColorModule.html" data-type="entity-link">ColorModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ColorModule-4c647b08ad19394818a8bfd96f37ebb8"' : 'data-target="#xs-components-links-module-ColorModule-4c647b08ad19394818a8bfd96f37ebb8"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ColorModule-4c647b08ad19394818a8bfd96f37ebb8"' :
                                            'id="xs-components-links-module-ColorModule-4c647b08ad19394818a8bfd96f37ebb8"' }>
                                            <li class="link">
                                                <a href="components/ColorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ColorComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DataViewModule.html" data-type="entity-link">DataViewModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DataViewModule-cb25c751fea548e1f576a761442f1bc5"' : 'data-target="#xs-components-links-module-DataViewModule-cb25c751fea548e1f576a761442f1bc5"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DataViewModule-cb25c751fea548e1f576a761442f1bc5"' :
                                            'id="xs-components-links-module-DataViewModule-cb25c751fea548e1f576a761442f1bc5"' }>
                                            <li class="link">
                                                <a href="components/MainComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MainComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StartProjectIconComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StartProjectIconComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StartProjectOptionsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StartProjectOptionsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TableComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TableComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TableIconComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TableIconComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DragDropModule.html" data-type="entity-link">DragDropModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-DragDropModule-1ea744b8ed5fb036560ad7edaa617543"' : 'data-target="#xs-directives-links-module-DragDropModule-1ea744b8ed5fb036560ad7edaa617543"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-DragDropModule-1ea744b8ed5fb036560ad7edaa617543"' :
                                        'id="xs-directives-links-module-DragDropModule-1ea744b8ed5fb036560ad7edaa617543"' }>
                                        <li class="link">
                                            <a href="directives/DraggableDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">DraggableDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/DroppableDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">DroppableDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DvlFwAngularModule.html" data-type="entity-link">DvlFwAngularModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/EdgeSizeModule.html" data-type="entity-link">EdgeSizeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-EdgeSizeModule-4f874c5e72c431093c109bde4f62d590"' : 'data-target="#xs-components-links-module-EdgeSizeModule-4f874c5e72c431093c109bde4f62d590"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-EdgeSizeModule-4f874c5e72c431093c109bde4f62d590"' :
                                            'id="xs-components-links-module-EdgeSizeModule-4f874c5e72c431093c109bde4f62d590"' }>
                                            <li class="link">
                                                <a href="components/EdgeSizeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EdgeSizeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/GeomapModule.html" data-type="entity-link">GeomapModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-GeomapModule-1bad448ba2c133f69633bb261c277de0"' : 'data-target="#xs-components-links-module-GeomapModule-1bad448ba2c133f69633bb261c277de0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-GeomapModule-1bad448ba2c133f69633bb261c277de0"' :
                                            'id="xs-components-links-module-GeomapModule-1bad448ba2c133f69633bb261c277de0"' }>
                                            <li class="link">
                                                <a href="components/GeomapComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GeomapComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ItemModule.html" data-type="entity-link">ItemModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ItemModule-8169ab8f66470032409c725e845e4db0"' : 'data-target="#xs-components-links-module-ItemModule-8169ab8f66470032409c725e845e4db0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ItemModule-8169ab8f66470032409c725e845e4db0"' :
                                            'id="xs-components-links-module-ItemModule-8169ab8f66470032409c725e845e4db0"' }>
                                            <li class="link">
                                                <a href="components/ItemComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ItemComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LegendModule.html" data-type="entity-link">LegendModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LegendModule-ccf2441fad521718ea5d3e2fefd7297d"' : 'data-target="#xs-components-links-module-LegendModule-ccf2441fad521718ea5d3e2fefd7297d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LegendModule-ccf2441fad521718ea5d3e2fefd7297d"' :
                                            'id="xs-components-links-module-LegendModule-ccf2441fad521718ea5d3e2fefd7297d"' }>
                                            <li class="link">
                                                <a href="components/LegendComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LegendComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LegendViewModule.html" data-type="entity-link">LegendViewModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LegendViewModule-397ee0120bfd5c82bbc757cc2beddad2"' : 'data-target="#xs-components-links-module-LegendViewModule-397ee0120bfd5c82bbc757cc2beddad2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LegendViewModule-397ee0120bfd5c82bbc757cc2beddad2"' :
                                            'id="xs-components-links-module-LegendViewModule-397ee0120bfd5c82bbc757cc2beddad2"' }>
                                            <li class="link">
                                                <a href="components/DataVariableDropzoneComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DataVariableDropzoneComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GraphicVariableLegendComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GraphicVariableLegendComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MakeAVisModule.html" data-type="entity-link">MakeAVisModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MakeAVisModule-21b8a028c1cb0f920be85815aa70e78a"' : 'data-target="#xs-components-links-module-MakeAVisModule-21b8a028c1cb0f920be85815aa70e78a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MakeAVisModule-21b8a028c1cb0f920be85815aa70e78a"' :
                                            'id="xs-components-links-module-MakeAVisModule-21b8a028c1cb0f920be85815aa70e78a"' }>
                                            <li class="link">
                                                <a href="components/LightThemeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LightThemeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MakeAVisComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MakeAVisComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MavSelectionModule.html" data-type="entity-link">MavSelectionModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MavSelectionModule-9b5ab9bd28c0eded1641ca92d5f89af3"' : 'data-target="#xs-components-links-module-MavSelectionModule-9b5ab9bd28c0eded1641ca92d5f89af3"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MavSelectionModule-9b5ab9bd28c0eded1641ca92d5f89af3"' :
                                            'id="xs-components-links-module-MavSelectionModule-9b5ab9bd28c0eded1641ca92d5f89af3"' }>
                                            <li class="link">
                                                <a href="components/GraphicSymbolTypeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GraphicSymbolTypeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GraphicVariableIconComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GraphicVariableIconComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GraphicVariableTypeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GraphicVariableTypeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ScienceMapIconComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ScienceMapIconComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TemporalBargraphIconComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TemporalBargraphIconComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VisualizationTypeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">VisualizationTypeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/NetworkModule.html" data-type="entity-link">NetworkModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-NetworkModule-3c89f6bb64446d869dc4d3f63a6f00b6"' : 'data-target="#xs-components-links-module-NetworkModule-3c89f6bb64446d869dc4d3f63a6f00b6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NetworkModule-3c89f6bb64446d869dc4d3f63a6f00b6"' :
                                            'id="xs-components-links-module-NetworkModule-3c89f6bb64446d869dc4d3f63a6f00b6"' }>
                                            <li class="link">
                                                <a href="components/NetworkComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NetworkComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/NgxDinoModule.html" data-type="entity-link">NgxDinoModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/NodeSizeModule.html" data-type="entity-link">NodeSizeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-NodeSizeModule-aab81b0f18693c71464070c946b6a7fc"' : 'data-target="#xs-components-links-module-NodeSizeModule-aab81b0f18693c71464070c946b6a7fc"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NodeSizeModule-aab81b0f18693c71464070c946b6a7fc"' :
                                            'id="xs-components-links-module-NodeSizeModule-aab81b0f18693c71464070c946b6a7fc"' }>
                                            <li class="link">
                                                <a href="components/NodeSizeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NodeSizeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ScatterplotModule.html" data-type="entity-link">ScatterplotModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ScatterplotModule-6aab08f0c8eddfb196150e82a1d4bc18"' : 'data-target="#xs-components-links-module-ScatterplotModule-6aab08f0c8eddfb196150e82a1d4bc18"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ScatterplotModule-6aab08f0c8eddfb196150e82a1d4bc18"' :
                                            'id="xs-components-links-module-ScatterplotModule-6aab08f0c8eddfb196150e82a1d4bc18"' }>
                                            <li class="link">
                                                <a href="components/ScatterplotComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ScatterplotComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SciencemapModule.html" data-type="entity-link">SciencemapModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SciencemapModule-69b8f4de17414325d2f1f6c4c7442e6f"' : 'data-target="#xs-components-links-module-SciencemapModule-69b8f4de17414325d2f1f6c4c7442e6f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SciencemapModule-69b8f4de17414325d2f1f6c4c7442e6f"' :
                                            'id="xs-components-links-module-SciencemapModule-69b8f4de17414325d2f1f6c4c7442e6f"' }>
                                            <li class="link">
                                                <a href="components/SciencemapComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SciencemapComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StaticLegendModule.html" data-type="entity-link">StaticLegendModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-StaticLegendModule-946a289a2c959c213bc71b028fc4eddf"' : 'data-target="#xs-components-links-module-StaticLegendModule-946a289a2c959c213bc71b028fc4eddf"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-StaticLegendModule-946a289a2c959c213bc71b028fc4eddf"' :
                                            'id="xs-components-links-module-StaticLegendModule-946a289a2c959c213bc71b028fc4eddf"' }>
                                            <li class="link">
                                                <a href="components/AreaSizeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AreaSizeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ColorAreaComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ColorAreaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ColorEdgesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ColorEdgesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EndComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EndComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GradientComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GradientComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/IdentifierComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">IdentifierComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LabelComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LabelComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ShapeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ShapeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SourceComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SourceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StartComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StartComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TargetComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TargetComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ThicknessComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ThicknessComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/XAxisComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">XAxisComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/YAxisComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">YAxisComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TemporalBargraphModule.html" data-type="entity-link">TemporalBargraphModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TemporalBargraphModule-60e303d64c8541522360dde5cf79220f"' : 'data-target="#xs-components-links-module-TemporalBargraphModule-60e303d64c8541522360dde5cf79220f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TemporalBargraphModule-60e303d64c8541522360dde5cf79220f"' :
                                            'id="xs-components-links-module-TemporalBargraphModule-60e303d64c8541522360dde5cf79220f"' }>
                                            <li class="link">
                                                <a href="components/TemporalBargraphComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TemporalBargraphComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ToolbarModule.html" data-type="entity-link">ToolbarModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ToolbarModule-99e6038b048e4ffd06f82f4cd28e0634"' : 'data-target="#xs-components-links-module-ToolbarModule-99e6038b048e4ffd06f82f4cd28e0634"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ToolbarModule-99e6038b048e4ffd06f82f4cd28e0634"' :
                                            'id="xs-components-links-module-ToolbarModule-99e6038b048e4ffd06f82f4cd28e0634"' }>
                                            <li class="link">
                                                <a href="components/CnsLogoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CnsLogoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CnsLogoIconComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CnsLogoIconComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GithubIconComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GithubIconComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InfoDialogComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">InfoDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InfoIconComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">InfoIconComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MenuIconComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MenuIconComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NsfLogoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NsfLogoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SiceLogoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SiceLogoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SidenavContentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SidenavContentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ToolbarContentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ToolbarContentComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/VisualizationModule.html" data-type="entity-link">VisualizationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-VisualizationModule-19336a18d8d6402327b05f8e55a611ed"' : 'data-target="#xs-components-links-module-VisualizationModule-19336a18d8d6402327b05f8e55a611ed"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-VisualizationModule-19336a18d8d6402327b05f8e55a611ed"' :
                                            'id="xs-components-links-module-VisualizationModule-19336a18d8d6402327b05f8e55a611ed"' }>
                                            <li class="link">
                                                <a href="components/DvlFwVisualizationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DvlFwVisualizationComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/VisualizationViewModule.html" data-type="entity-link">VisualizationViewModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-VisualizationViewModule-914f045f5f62c854f367b57a9725e290"' : 'data-target="#xs-components-links-module-VisualizationViewModule-914f045f5f62c854f367b57a9725e290"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-VisualizationViewModule-914f045f5f62c854f367b57a9725e290"' :
                                            'id="xs-components-links-module-VisualizationViewModule-914f045f5f62c854f367b57a9725e290"' }>
                                            <li class="link">
                                                <a href="components/AddIconComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddIconComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CancelIconComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CancelIconComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditIconComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditIconComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GeomapIconComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GeomapIconComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HorizontalBarGraphIconComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HorizontalBarGraphIconComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MapOfScienceIconComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MapOfScienceIconComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MenuComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NetworkIconComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NetworkIconComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ScatterGraphIconComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ScatterGraphIconComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/GeomapIconComponent-1.html" data-type="entity-link">GeomapIconComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LegendComponent-1.html" data-type="entity-link">LegendComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MainComponent-1.html" data-type="entity-link">MainComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MainComponent-2.html" data-type="entity-link">MainComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MainComponent-3.html" data-type="entity-link">MainComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MainComponent-4.html" data-type="entity-link">MainComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NetworkIconComponent-1.html" data-type="entity-link">NetworkIconComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ScatterGraphIconComponent-1.html" data-type="entity-link">ScatterGraphIconComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/ActivityLogDataSource.html" data-type="entity-link">ActivityLogDataSource</a>
                            </li>
                            <li class="link">
                                <a href="classes/ActivityLogDataSourceFactory.html" data-type="entity-link">ActivityLogDataSourceFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/ActivityLogPlugin.html" data-type="entity-link">ActivityLogPlugin</a>
                            </li>
                            <li class="link">
                                <a href="classes/ActivityLogRawData.html" data-type="entity-link">ActivityLogRawData</a>
                            </li>
                            <li class="link">
                                <a href="classes/ActivityLogRawDataFactory.html" data-type="entity-link">ActivityLogRawDataFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/AddNewVisualization.html" data-type="entity-link">AddNewVisualization</a>
                            </li>
                            <li class="link">
                                <a href="classes/AdvancedToggle.html" data-type="entity-link">AdvancedToggle</a>
                            </li>
                            <li class="link">
                                <a href="classes/ApplicationInitializedAction.html" data-type="entity-link">ApplicationInitializedAction</a>
                            </li>
                            <li class="link">
                                <a href="classes/AppPage.html" data-type="entity-link">AppPage</a>
                            </li>
                            <li class="link">
                                <a href="classes/AppPage-1.html" data-type="entity-link">AppPage</a>
                            </li>
                            <li class="link">
                                <a href="classes/AreaSizeVisualization.html" data-type="entity-link">AreaSizeVisualization</a>
                            </li>
                            <li class="link">
                                <a href="classes/AreaSizeVisualizationFactory.html" data-type="entity-link">AreaSizeVisualizationFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/Author.html" data-type="entity-link">Author</a>
                            </li>
                            <li class="link">
                                <a href="classes/AuthorStats.html" data-type="entity-link">AuthorStats</a>
                            </li>
                            <li class="link">
                                <a href="classes/Award.html" data-type="entity-link">Award</a>
                            </li>
                            <li class="link">
                                <a href="classes/AwardStats.html" data-type="entity-link">AwardStats</a>
                            </li>
                            <li class="link">
                                <a href="classes/BaseVisualizationComponent.html" data-type="entity-link">BaseVisualizationComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/ClonedGraphicSymbol.html" data-type="entity-link">ClonedGraphicSymbol</a>
                            </li>
                            <li class="link">
                                <a href="classes/ClonedVisualization.html" data-type="entity-link">ClonedVisualization</a>
                            </li>
                            <li class="link">
                                <a href="classes/ClosedInfoIcon.html" data-type="entity-link">ClosedInfoIcon</a>
                            </li>
                            <li class="link">
                                <a href="classes/CoAuthorLink.html" data-type="entity-link">CoAuthorLink</a>
                            </li>
                            <li class="link">
                                <a href="classes/CoAuthorLinkStats.html" data-type="entity-link">CoAuthorLinkStats</a>
                            </li>
                            <li class="link">
                                <a href="classes/ColorAreaVisualization.html" data-type="entity-link">ColorAreaVisualization</a>
                            </li>
                            <li class="link">
                                <a href="classes/ColorAreaVisualizationFactory.html" data-type="entity-link">ColorAreaVisualizationFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/ColorEdgesVisualization.html" data-type="entity-link">ColorEdgesVisualization</a>
                            </li>
                            <li class="link">
                                <a href="classes/ColorEdgesVisualizationFactory.html" data-type="entity-link">ColorEdgesVisualizationFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/ColorScale.html" data-type="entity-link">ColorScale</a>
                            </li>
                            <li class="link">
                                <a href="classes/ColorVisualization.html" data-type="entity-link">ColorVisualization</a>
                            </li>
                            <li class="link">
                                <a href="classes/ColorVisualizationFactory.html" data-type="entity-link">ColorVisualizationFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/CoPiLink.html" data-type="entity-link">CoPiLink</a>
                            </li>
                            <li class="link">
                                <a href="classes/CoPiLinkStats.html" data-type="entity-link">CoPiLinkStats</a>
                            </li>
                            <li class="link">
                                <a href="classes/CopyToClipboardError.html" data-type="entity-link">CopyToClipboardError</a>
                            </li>
                            <li class="link">
                                <a href="classes/CopyToClipboardSuccess.html" data-type="entity-link">CopyToClipboardSuccess</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateShareUrlCompleted.html" data-type="entity-link">CreateShareUrlCompleted</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateShareUrlError.html" data-type="entity-link">CreateShareUrlError</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateShareUrlStarted.html" data-type="entity-link">CreateShareUrlStarted</a>
                            </li>
                            <li class="link">
                                <a href="classes/CSVTemplateProject.html" data-type="entity-link">CSVTemplateProject</a>
                            </li>
                            <li class="link">
                                <a href="classes/DataLinkManagerBase.html" data-type="entity-link">DataLinkManagerBase</a>
                            </li>
                            <li class="link">
                                <a href="classes/DataLinkSourceManager.html" data-type="entity-link">DataLinkSourceManager</a>
                            </li>
                            <li class="link">
                                <a href="classes/DataLinkTargetManager.html" data-type="entity-link">DataLinkTargetManager</a>
                            </li>
                            <li class="link">
                                <a href="classes/DefaultDataSource.html" data-type="entity-link">DefaultDataSource</a>
                            </li>
                            <li class="link">
                                <a href="classes/DefaultDataSourceFactory.html" data-type="entity-link">DefaultDataSourceFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/DefaultDataVariable.html" data-type="entity-link">DefaultDataVariable</a>
                            </li>
                            <li class="link">
                                <a href="classes/DefaultGraphicSymbol.html" data-type="entity-link">DefaultGraphicSymbol</a>
                            </li>
                            <li class="link">
                                <a href="classes/DefaultGraphicSymbolFactory.html" data-type="entity-link">DefaultGraphicSymbolFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/DefaultGraphicVariable.html" data-type="entity-link">DefaultGraphicVariable</a>
                            </li>
                            <li class="link">
                                <a href="classes/DefaultGraphicVariableMapping.html" data-type="entity-link">DefaultGraphicVariableMapping</a>
                            </li>
                            <li class="link">
                                <a href="classes/DefaultGraphicVariableMappingFactory.html" data-type="entity-link">DefaultGraphicVariableMappingFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/DefaultPlugin.html" data-type="entity-link">DefaultPlugin</a>
                            </li>
                            <li class="link">
                                <a href="classes/DefaultProject.html" data-type="entity-link">DefaultProject</a>
                            </li>
                            <li class="link">
                                <a href="classes/DefaultProjectFactory.html" data-type="entity-link">DefaultProjectFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/DefaultRawData.html" data-type="entity-link">DefaultRawData</a>
                            </li>
                            <li class="link">
                                <a href="classes/DefaultRawDataFactory.html" data-type="entity-link">DefaultRawDataFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/DefaultRecordSet.html" data-type="entity-link">DefaultRecordSet</a>
                            </li>
                            <li class="link">
                                <a href="classes/DefaultRecordSetFactory.html" data-type="entity-link">DefaultRecordSetFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/DefaultRecordStream.html" data-type="entity-link">DefaultRecordStream</a>
                            </li>
                            <li class="link">
                                <a href="classes/DefaultVisualization.html" data-type="entity-link">DefaultVisualization</a>
                            </li>
                            <li class="link">
                                <a href="classes/DefaultVisualizationFactory.html" data-type="entity-link">DefaultVisualizationFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/EdgeSizeVisualization.html" data-type="entity-link">EdgeSizeVisualization</a>
                            </li>
                            <li class="link">
                                <a href="classes/EdgeSizeVisualizationFactory.html" data-type="entity-link">EdgeSizeVisualizationFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/EndVisualization.html" data-type="entity-link">EndVisualization</a>
                            </li>
                            <li class="link">
                                <a href="classes/EndVisualizationFactory.html" data-type="entity-link">EndVisualizationFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/ExportSnapshotCompleted.html" data-type="entity-link">ExportSnapshotCompleted</a>
                            </li>
                            <li class="link">
                                <a href="classes/ExportSnapshotError.html" data-type="entity-link">ExportSnapshotError</a>
                            </li>
                            <li class="link">
                                <a href="classes/ExportSnapshotStarted.html" data-type="entity-link">ExportSnapshotStarted</a>
                            </li>
                            <li class="link">
                                <a href="classes/Geocoder.html" data-type="entity-link">Geocoder</a>
                            </li>
                            <li class="link">
                                <a href="classes/GeomapVisualization.html" data-type="entity-link">GeomapVisualization</a>
                            </li>
                            <li class="link">
                                <a href="classes/GeomapVisualizationFactory.html" data-type="entity-link">GeomapVisualizationFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/GradientVisualization.html" data-type="entity-link">GradientVisualization</a>
                            </li>
                            <li class="link">
                                <a href="classes/GradientVisualizationFactory.html" data-type="entity-link">GradientVisualizationFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/GVGroupPanelClosed.html" data-type="entity-link">GVGroupPanelClosed</a>
                            </li>
                            <li class="link">
                                <a href="classes/GVGroupPanelOpened.html" data-type="entity-link">GVGroupPanelOpened</a>
                            </li>
                            <li class="link">
                                <a href="classes/GVGroupPanelStreamChange.html" data-type="entity-link">GVGroupPanelStreamChange</a>
                            </li>
                            <li class="link">
                                <a href="classes/GVPanelClosed.html" data-type="entity-link">GVPanelClosed</a>
                            </li>
                            <li class="link">
                                <a href="classes/GVPanelOpened.html" data-type="entity-link">GVPanelOpened</a>
                            </li>
                            <li class="link">
                                <a href="classes/HideDataRows.html" data-type="entity-link">HideDataRows</a>
                            </li>
                            <li class="link">
                                <a href="classes/HideDataTableChildren.html" data-type="entity-link">HideDataTableChildren</a>
                            </li>
                            <li class="link">
                                <a href="classes/IdentifierVisualization.html" data-type="entity-link">IdentifierVisualization</a>
                            </li>
                            <li class="link">
                                <a href="classes/IdentifierVisualizationFactory.html" data-type="entity-link">IdentifierVisualizationFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/Investigator.html" data-type="entity-link">Investigator</a>
                            </li>
                            <li class="link">
                                <a href="classes/InvestigatorStats.html" data-type="entity-link">InvestigatorStats</a>
                            </li>
                            <li class="link">
                                <a href="classes/ISIDatabase.html" data-type="entity-link">ISIDatabase</a>
                            </li>
                            <li class="link">
                                <a href="classes/ISIDataSource.html" data-type="entity-link">ISIDataSource</a>
                            </li>
                            <li class="link">
                                <a href="classes/ISIDataSourceFactory.html" data-type="entity-link">ISIDataSourceFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/ISIParsedRawData.html" data-type="entity-link">ISIParsedRawData</a>
                            </li>
                            <li class="link">
                                <a href="classes/ISIParsedRawDataFactory.html" data-type="entity-link">ISIParsedRawDataFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/ISIPlugin.html" data-type="entity-link">ISIPlugin</a>
                            </li>
                            <li class="link">
                                <a href="classes/ISITemplateProject.html" data-type="entity-link">ISITemplateProject</a>
                            </li>
                            <li class="link">
                                <a href="classes/Journal.html" data-type="entity-link">Journal</a>
                            </li>
                            <li class="link">
                                <a href="classes/JournalStats.html" data-type="entity-link">JournalStats</a>
                            </li>
                            <li class="link">
                                <a href="classes/LabelVisualization.html" data-type="entity-link">LabelVisualization</a>
                            </li>
                            <li class="link">
                                <a href="classes/LabelVisualizationFactory.html" data-type="entity-link">LabelVisualizationFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoadProjectCompleted.html" data-type="entity-link">LoadProjectCompleted</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoadProjectError.html" data-type="entity-link">LoadProjectError</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoadProjectStarted.html" data-type="entity-link">LoadProjectStarted</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoadShareUrlCompleted.html" data-type="entity-link">LoadShareUrlCompleted</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoadShareUrlError.html" data-type="entity-link">LoadShareUrlError</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoadShareUrlStarted.html" data-type="entity-link">LoadShareUrlStarted</a>
                            </li>
                            <li class="link">
                                <a href="classes/NetworkVisualization.html" data-type="entity-link">NetworkVisualization</a>
                            </li>
                            <li class="link">
                                <a href="classes/NetworkVisualizationFactory.html" data-type="entity-link">NetworkVisualizationFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/NgxDinoPlugin.html" data-type="entity-link">NgxDinoPlugin</a>
                            </li>
                            <li class="link">
                                <a href="classes/NodeSizeVisualization.html" data-type="entity-link">NodeSizeVisualization</a>
                            </li>
                            <li class="link">
                                <a href="classes/NodeSizeVisualizationFactory.html" data-type="entity-link">NodeSizeVisualizationFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/NormalizedField.html" data-type="entity-link">NormalizedField</a>
                            </li>
                            <li class="link">
                                <a href="classes/NSFDatabase.html" data-type="entity-link">NSFDatabase</a>
                            </li>
                            <li class="link">
                                <a href="classes/NSFDataSource.html" data-type="entity-link">NSFDataSource</a>
                            </li>
                            <li class="link">
                                <a href="classes/NSFDataSourceFactory.html" data-type="entity-link">NSFDataSourceFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/NSFParsedRawData.html" data-type="entity-link">NSFParsedRawData</a>
                            </li>
                            <li class="link">
                                <a href="classes/NSFParsedRawDataFactory.html" data-type="entity-link">NSFParsedRawDataFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/NSFPlugin.html" data-type="entity-link">NSFPlugin</a>
                            </li>
                            <li class="link">
                                <a href="classes/NSFTemplateProject.html" data-type="entity-link">NSFTemplateProject</a>
                            </li>
                            <li class="link">
                                <a href="classes/ObjectFactoryRegistry.html" data-type="entity-link">ObjectFactoryRegistry</a>
                            </li>
                            <li class="link">
                                <a href="classes/OpenedInfoIcon.html" data-type="entity-link">OpenedInfoIcon</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProjectSerializer.html" data-type="entity-link">ProjectSerializer</a>
                            </li>
                            <li class="link">
                                <a href="classes/Publication.html" data-type="entity-link">Publication</a>
                            </li>
                            <li class="link">
                                <a href="classes/PublicationStats.html" data-type="entity-link">PublicationStats</a>
                            </li>
                            <li class="link">
                                <a href="classes/RemoveVisualization.html" data-type="entity-link">RemoveVisualization</a>
                            </li>
                            <li class="link">
                                <a href="classes/SaveProjectCompleted.html" data-type="entity-link">SaveProjectCompleted</a>
                            </li>
                            <li class="link">
                                <a href="classes/SaveProjectFileCreated.html" data-type="entity-link">SaveProjectFileCreated</a>
                            </li>
                            <li class="link">
                                <a href="classes/SaveProjectStarted.html" data-type="entity-link">SaveProjectStarted</a>
                            </li>
                            <li class="link">
                                <a href="classes/ScatterplotVisualization.html" data-type="entity-link">ScatterplotVisualization</a>
                            </li>
                            <li class="link">
                                <a href="classes/ScatterplotVisualizationFactory.html" data-type="entity-link">ScatterplotVisualizationFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/SciencemapVisualization.html" data-type="entity-link">SciencemapVisualization</a>
                            </li>
                            <li class="link">
                                <a href="classes/SciencemapVisualizationFactory.html" data-type="entity-link">SciencemapVisualizationFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/SetActiveDataVariable.html" data-type="entity-link">SetActiveDataVariable</a>
                            </li>
                            <li class="link">
                                <a href="classes/SetActiveVisualization.html" data-type="entity-link">SetActiveVisualization</a>
                            </li>
                            <li class="link">
                                <a href="classes/SetGraphicSymbolRecordSet.html" data-type="entity-link">SetGraphicSymbolRecordSet</a>
                            </li>
                            <li class="link">
                                <a href="classes/SetGraphicVariable.html" data-type="entity-link">SetGraphicVariable</a>
                            </li>
                            <li class="link">
                                <a href="classes/SetRecordStream.html" data-type="entity-link">SetRecordStream</a>
                            </li>
                            <li class="link">
                                <a href="classes/ShapeVisualization.html" data-type="entity-link">ShapeVisualization</a>
                            </li>
                            <li class="link">
                                <a href="classes/ShapeVisualizationFactory.html" data-type="entity-link">ShapeVisualizationFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/ShowDataRows.html" data-type="entity-link">ShowDataRows</a>
                            </li>
                            <li class="link">
                                <a href="classes/ShowDataTableChildren.html" data-type="entity-link">ShowDataTableChildren</a>
                            </li>
                            <li class="link">
                                <a href="classes/SimpleGraphicSymbol.html" data-type="entity-link">SimpleGraphicSymbol</a>
                            </li>
                            <li class="link">
                                <a href="classes/SizeScale.html" data-type="entity-link">SizeScale</a>
                            </li>
                            <li class="link">
                                <a href="classes/SourceVisualization.html" data-type="entity-link">SourceVisualization</a>
                            </li>
                            <li class="link">
                                <a href="classes/SourceVisualizationFactory.html" data-type="entity-link">SourceVisualizationFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/StartVisualization.html" data-type="entity-link">StartVisualization</a>
                            </li>
                            <li class="link">
                                <a href="classes/StartVisualizationFactory.html" data-type="entity-link">StartVisualizationFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/StoreLogger.html" data-type="entity-link">StoreLogger</a>
                            </li>
                            <li class="link">
                                <a href="classes/Subdiscipline.html" data-type="entity-link">Subdiscipline</a>
                            </li>
                            <li class="link">
                                <a href="classes/SubdisciplineStats.html" data-type="entity-link">SubdisciplineStats</a>
                            </li>
                            <li class="link">
                                <a href="classes/TargetVisualization.html" data-type="entity-link">TargetVisualization</a>
                            </li>
                            <li class="link">
                                <a href="classes/TargetVisualizationFactory.html" data-type="entity-link">TargetVisualizationFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/TemporalBargraphVisualization.html" data-type="entity-link">TemporalBargraphVisualization</a>
                            </li>
                            <li class="link">
                                <a href="classes/TemporalBargraphVisualizationFactory.html" data-type="entity-link">TemporalBargraphVisualizationFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/ThicknessVisualization.html" data-type="entity-link">ThicknessVisualization</a>
                            </li>
                            <li class="link">
                                <a href="classes/ThicknessVisualizationFactory.html" data-type="entity-link">ThicknessVisualizationFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/ToggleLogging.html" data-type="entity-link">ToggleLogging</a>
                            </li>
                            <li class="link">
                                <a href="classes/UnsetGraphicVariable.html" data-type="entity-link">UnsetGraphicVariable</a>
                            </li>
                            <li class="link">
                                <a href="classes/UnsetRecordStream.html" data-type="entity-link">UnsetRecordStream</a>
                            </li>
                            <li class="link">
                                <a href="classes/XAxisVisualization.html" data-type="entity-link">XAxisVisualization</a>
                            </li>
                            <li class="link">
                                <a href="classes/XAxisVisualizationFactory.html" data-type="entity-link">XAxisVisualizationFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/YAxisVisualization.html" data-type="entity-link">YAxisVisualization</a>
                            </li>
                            <li class="link">
                                <a href="classes/YAxisVisualizationFactory.html" data-type="entity-link">YAxisVisualizationFactory</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ActionDispatcherService.html" data-type="entity-link">ActionDispatcherService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AdvancedService.html" data-type="entity-link">AdvancedService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AppUpdaterService.html" data-type="entity-link">AppUpdaterService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DataLinkService.html" data-type="entity-link">DataLinkService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DataService.html" data-type="entity-link">DataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DataVariableHoverService.html" data-type="entity-link">DataVariableHoverService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DragDropService.html" data-type="entity-link">DragDropService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ExportService.html" data-type="entity-link">ExportService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ExportTableService.html" data-type="entity-link">ExportTableService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ExportToPdfService.html" data-type="entity-link">ExportToPdfService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ExportToPngService.html" data-type="entity-link">ExportToPngService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ExportToSvgService.html" data-type="entity-link">ExportToSvgService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GetLinkService.html" data-type="entity-link">GetLinkService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LegendService.html" data-type="entity-link">LegendService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoadProjectService.html" data-type="entity-link">LoadProjectService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LogActions.html" data-type="entity-link">LogActions</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoggingControlService.html" data-type="entity-link">LoggingControlService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProjectLoaderService.html" data-type="entity-link">ProjectLoaderService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProjectManagerService.html" data-type="entity-link">ProjectManagerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProjectSerializerService.html" data-type="entity-link">ProjectSerializerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ReadNewFileService.html" data-type="entity-link">ReadNewFileService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SaveProjectService.html" data-type="entity-link">SaveProjectService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UpdateVisService.html" data-type="entity-link">UpdateVisService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ActivityLogDataSourceOptions.html" data-type="entity-link">ActivityLogDataSourceOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ApplicationState.html" data-type="entity-link">ApplicationState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CopyToClipboardErrorPayload.html" data-type="entity-link">CopyToClipboardErrorPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CopyToClipboardSuccessPayload.html" data-type="entity-link">CopyToClipboardSuccessPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CreateShareUrlCompletedPayload.html" data-type="entity-link">CreateShareUrlCompletedPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DataLinkSource.html" data-type="entity-link">DataLinkSource</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DataLinkTarget.html" data-type="entity-link">DataLinkTarget</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DataSource.html" data-type="entity-link">DataSource</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DataSource-1.html" data-type="entity-link">DataSource</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DataSourceOptions.html" data-type="entity-link">DataSourceOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DataTableState.html" data-type="entity-link">DataTableState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DataVariable.html" data-type="entity-link">DataVariable</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DefaultGraphicVariableMappingArg.html" data-type="entity-link">DefaultGraphicVariableMappingArg</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Discipline.html" data-type="entity-link">Discipline</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DragEndEvent.html" data-type="entity-link">DragEndEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DragStartEvent.html" data-type="entity-link">DragStartEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ErrorPayload.html" data-type="entity-link">ErrorPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ExportSnapshotCompletedPayload.html" data-type="entity-link">ExportSnapshotCompletedPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ExportToPdfOptions.html" data-type="entity-link">ExportToPdfOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GraphicSymbol.html" data-type="entity-link">GraphicSymbol</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GraphicSymbolOption.html" data-type="entity-link">GraphicSymbolOption</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GraphicVariable.html" data-type="entity-link">GraphicVariable</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GraphicVariableOption.html" data-type="entity-link">GraphicVariableOption</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Group.html" data-type="entity-link">Group</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GVGroupPanelState.html" data-type="entity-link">GVGroupPanelState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HeirarchicalRecordStream.html" data-type="entity-link">HeirarchicalRecordStream</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InfoIcon.html" data-type="entity-link">InfoIcon</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InfoItem.html" data-type="entity-link">InfoItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISIDataSourceOptions.html" data-type="entity-link">ISIDataSourceOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISIRecord.html" data-type="entity-link">ISIRecord</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ItemGroup.html" data-type="entity-link">ItemGroup</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoadProjectCompletedPayload.html" data-type="entity-link">LoadProjectCompletedPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoadProjectStartedPayload.html" data-type="entity-link">LoadProjectStartedPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoadShareUrlCompletedPayload.html" data-type="entity-link">LoadShareUrlCompletedPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Location.html" data-type="entity-link">Location</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ManagedProject.html" data-type="entity-link">ManagedProject</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MavSelectionState.html" data-type="entity-link">MavSelectionState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NSFDataSourceOptions.html" data-type="entity-link">NSFDataSourceOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NSFRecord.html" data-type="entity-link">NSFRecord</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ObjectFactory.html" data-type="entity-link">ObjectFactory</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ObjectFactoryMap.html" data-type="entity-link">ObjectFactoryMap</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ObjectFactoryPlugin.html" data-type="entity-link">ObjectFactoryPlugin</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OnGraphicSymbolChange.html" data-type="entity-link">OnGraphicSymbolChange</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OnPropertyChange.html" data-type="entity-link">OnPropertyChange</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ParseMeta.html" data-type="entity-link">ParseMeta</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ParseResult.html" data-type="entity-link">ParseResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Project.html" data-type="entity-link">Project</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RawData.html" data-type="entity-link">RawData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RecordSet.html" data-type="entity-link">RecordSet</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RecordStream.html" data-type="entity-link">RecordStream</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RGB.html" data-type="entity-link">RGB</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SaveProjectCompletedPayload.html" data-type="entity-link">SaveProjectCompletedPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SetGraphicSymbolRecordSetPayload.html" data-type="entity-link">SetGraphicSymbolRecordSetPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SetGraphicVariablePayload.html" data-type="entity-link">SetGraphicVariablePayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SetRecordStreamPayload.html" data-type="entity-link">SetRecordStreamPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SidenavState.html" data-type="entity-link">SidenavState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SimpleFieldGroup.html" data-type="entity-link">SimpleFieldGroup</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SimpleFieldGroups.html" data-type="entity-link">SimpleFieldGroups</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SimpleProperties.html" data-type="entity-link">SimpleProperties</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Tag.html" data-type="entity-link">Tag</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TagMapping.html" data-type="entity-link">TagMapping</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ToggleDataTableChildren.html" data-type="entity-link">ToggleDataTableChildren</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ToggleDataTableRows.html" data-type="entity-link">ToggleDataTableRows</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ToggleSelectionPanelType.html" data-type="entity-link">ToggleSelectionPanelType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UnsetGraphicVariablePayload.html" data-type="entity-link">UnsetGraphicVariablePayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UnsetRecordStreamPayload.html" data-type="entity-link">UnsetRecordStreamPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Vis.html" data-type="entity-link">Vis</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VisType.html" data-type="entity-link">VisType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Visualization.html" data-type="entity-link">Visualization</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VisualizationChange.html" data-type="entity-link">VisualizationChange</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VisualizationComponent.html" data-type="entity-link">VisualizationComponent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VisualizationGroup.html" data-type="entity-link">VisualizationGroup</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});