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
                    <a href="index.html" data-type="index-link">global-market-demo documentation</a>
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
                                            'data-target="#components-links-module-AppModule-033a4dbe36a26d5be5855806af3bb26a"' : 'data-target="#xs-components-links-module-AppModule-033a4dbe36a26d5be5855806af3bb26a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-033a4dbe36a26d5be5855806af3bb26a"' :
                                            'id="xs-components-links-module-AppModule-033a4dbe36a26d5be5855806af3bb26a"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AuthComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AuthComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CartLayoutComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CartLayoutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CategoryLayoutComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CategoryLayoutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CommonLayoutComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CommonLayoutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DashboardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ErrorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ErrorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InvoiceLayoutComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">InvoiceLayoutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OrderLayoutComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrderLayoutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PaymentLayoutComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PaymentLayoutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProductLayoutComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProductLayoutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ShopLayoutComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ShopLayoutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SubCategoryLayoutComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SubCategoryLayoutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TagLayoutComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TagLayoutComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link">AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AuthModule-f029b3b235c061e87371a863f9030101"' : 'data-target="#xs-components-links-module-AuthModule-f029b3b235c061e87371a863f9030101"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AuthModule-f029b3b235c061e87371a863f9030101"' :
                                            'id="xs-components-links-module-AuthModule-f029b3b235c061e87371a863f9030101"' }>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegisterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RegisterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ResetPasswordComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ResetPasswordComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CartLayoutModule.html" data-type="entity-link">CartLayoutModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CartLayoutModule-31302bf00adccc3a6fa241c0fdf6cdfb"' : 'data-target="#xs-components-links-module-CartLayoutModule-31302bf00adccc3a6fa241c0fdf6cdfb"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CartLayoutModule-31302bf00adccc3a6fa241c0fdf6cdfb"' :
                                            'id="xs-components-links-module-CartLayoutModule-31302bf00adccc3a6fa241c0fdf6cdfb"' }>
                                            <li class="link">
                                                <a href="components/CheckoutComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CheckoutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserCartComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserCartComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CategoryLayoutModule.html" data-type="entity-link">CategoryLayoutModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CategoryLayoutModule-c63b9eb6eb3e6a436cf9eefeb252c544"' : 'data-target="#xs-components-links-module-CategoryLayoutModule-c63b9eb6eb3e6a436cf9eefeb252c544"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CategoryLayoutModule-c63b9eb6eb3e6a436cf9eefeb252c544"' :
                                            'id="xs-components-links-module-CategoryLayoutModule-c63b9eb6eb3e6a436cf9eefeb252c544"' }>
                                            <li class="link">
                                                <a href="components/CategoryDetailsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CategoryDetailsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ChatbotModule.html" data-type="entity-link">ChatbotModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ChatbotModule-00e2da5fbcdf956b8fc295e12a2ef9c4"' : 'data-target="#xs-components-links-module-ChatbotModule-00e2da5fbcdf956b8fc295e12a2ef9c4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ChatbotModule-00e2da5fbcdf956b8fc295e12a2ef9c4"' :
                                            'id="xs-components-links-module-ChatbotModule-00e2da5fbcdf956b8fc295e12a2ef9c4"' }>
                                            <li class="link">
                                                <a href="components/ChatbotComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ChatbotComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CommonLayoutModule.html" data-type="entity-link">CommonLayoutModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CommonLayoutModule-3e807213ad85e5d66233843200e2fe6e"' : 'data-target="#xs-components-links-module-CommonLayoutModule-3e807213ad85e5d66233843200e2fe6e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CommonLayoutModule-3e807213ad85e5d66233843200e2fe6e"' :
                                            'id="xs-components-links-module-CommonLayoutModule-3e807213ad85e5d66233843200e2fe6e"' }>
                                            <li class="link">
                                                <a href="components/SearchBarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SearchBarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SearchComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SearchComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ComponentModule.html" data-type="entity-link">ComponentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ComponentModule-579172c4f2c5b94744f1bebee6906ca5"' : 'data-target="#xs-components-links-module-ComponentModule-579172c4f2c5b94744f1bebee6906ca5"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ComponentModule-579172c4f2c5b94744f1bebee6906ca5"' :
                                            'id="xs-components-links-module-ComponentModule-579172c4f2c5b94744f1bebee6906ca5"' }>
                                            <li class="link">
                                                <a href="components/FooterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavbarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NavbarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SidebarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SidebarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DashboardModule.html" data-type="entity-link">DashboardModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DashboardModule-98bcc39ce1c8d406988bf8a7d95065b8"' : 'data-target="#xs-components-links-module-DashboardModule-98bcc39ce1c8d406988bf8a7d95065b8"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DashboardModule-98bcc39ce1c8d406988bf8a7d95065b8"' :
                                            'id="xs-components-links-module-DashboardModule-98bcc39ce1c8d406988bf8a7d95065b8"' }>
                                            <li class="link">
                                                <a href="components/CreateUserProfileComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CreateUserProfileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserProfileComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserProfileComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ErrorModule.html" data-type="entity-link">ErrorModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ErrorModule-74fe3c343904b59b52b4e5cc78339a38"' : 'data-target="#xs-components-links-module-ErrorModule-74fe3c343904b59b52b4e5cc78339a38"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ErrorModule-74fe3c343904b59b52b4e5cc78339a38"' :
                                            'id="xs-components-links-module-ErrorModule-74fe3c343904b59b52b4e5cc78339a38"' }>
                                            <li class="link">
                                                <a href="components/NoInternetComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NoInternetComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/FileModule.html" data-type="entity-link">FileModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/InvoiceLayoutModule.html" data-type="entity-link">InvoiceLayoutModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-InvoiceLayoutModule-2ebd5322507b4082a6f69e930ed343e6"' : 'data-target="#xs-components-links-module-InvoiceLayoutModule-2ebd5322507b4082a6f69e930ed343e6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-InvoiceLayoutModule-2ebd5322507b4082a6f69e930ed343e6"' :
                                            'id="xs-components-links-module-InvoiceLayoutModule-2ebd5322507b4082a6f69e930ed343e6"' }>
                                            <li class="link">
                                                <a href="components/InvoicesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">InvoicesComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MaterialModule.html" data-type="entity-link">MaterialModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MdbModule.html" data-type="entity-link">MdbModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/NgxModule.html" data-type="entity-link">NgxModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/OrderLayoutModule.html" data-type="entity-link">OrderLayoutModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-OrderLayoutModule-a46e307b425c17da9c9df0796b152723"' : 'data-target="#xs-components-links-module-OrderLayoutModule-a46e307b425c17da9c9df0796b152723"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-OrderLayoutModule-a46e307b425c17da9c9df0796b152723"' :
                                            'id="xs-components-links-module-OrderLayoutModule-a46e307b425c17da9c9df0796b152723"' }>
                                            <li class="link">
                                                <a href="components/OrderDetailsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrderDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OrdersComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrdersComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PaymentLayoutModule.html" data-type="entity-link">PaymentLayoutModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PipesModule.html" data-type="entity-link">PipesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-PipesModule-4a75a8e94014e583c57fc9dc48a49195"' : 'data-target="#xs-pipes-links-module-PipesModule-4a75a8e94014e583c57fc9dc48a49195"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-PipesModule-4a75a8e94014e583c57fc9dc48a49195"' :
                                            'id="xs-pipes-links-module-PipesModule-4a75a8e94014e583c57fc9dc48a49195"' }>
                                            <li class="link">
                                                <a href="pipes/CategoryPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CategoryPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/GeneralPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GeneralPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/ProductFilterPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProductFilterPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/TagPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TagPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProductLayoutModule.html" data-type="entity-link">ProductLayoutModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ProductLayoutModule-4b78705925df4e77a24aa37e67e8165a"' : 'data-target="#xs-components-links-module-ProductLayoutModule-4b78705925df4e77a24aa37e67e8165a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProductLayoutModule-4b78705925df4e77a24aa37e67e8165a"' :
                                            'id="xs-components-links-module-ProductLayoutModule-4b78705925df4e77a24aa37e67e8165a"' }>
                                            <li class="link">
                                                <a href="components/ProductDetailsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProductDetailsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link">SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SharedModule-1a9f803de2765666a88182a2af935164"' : 'data-target="#xs-components-links-module-SharedModule-1a9f803de2765666a88182a2af935164"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-1a9f803de2765666a88182a2af935164"' :
                                            'id="xs-components-links-module-SharedModule-1a9f803de2765666a88182a2af935164"' }>
                                            <li class="link">
                                                <a href="components/AddContactsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddContactsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AddToCartComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddToCartComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InvalidCredentialsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">InvalidCredentialsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginFirstComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginFirstComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ShowErrorDialogComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ShowErrorDialogComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ShopLayoutModule.html" data-type="entity-link">ShopLayoutModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ShopLayoutModule-4d333a6594d48eb8eccf24580859dab5"' : 'data-target="#xs-components-links-module-ShopLayoutModule-4d333a6594d48eb8eccf24580859dab5"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ShopLayoutModule-4d333a6594d48eb8eccf24580859dab5"' :
                                            'id="xs-components-links-module-ShopLayoutModule-4d333a6594d48eb8eccf24580859dab5"' }>
                                            <li class="link">
                                                <a href="components/ShopComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ShopComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StripeIntegrationModule.html" data-type="entity-link">StripeIntegrationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-StripeIntegrationModule-0a58775956343e2e38a429ea8a05d800"' : 'data-target="#xs-components-links-module-StripeIntegrationModule-0a58775956343e2e38a429ea8a05d800"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-StripeIntegrationModule-0a58775956343e2e38a429ea8a05d800"' :
                                            'id="xs-components-links-module-StripeIntegrationModule-0a58775956343e2e38a429ea8a05d800"' }>
                                            <li class="link">
                                                <a href="components/StripeCheckoutComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StripeCheckoutComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SubCategoryLayoutModule.html" data-type="entity-link">SubCategoryLayoutModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SubCategoryLayoutModule-a0ce0955478573405e4dbb647d0f7713"' : 'data-target="#xs-components-links-module-SubCategoryLayoutModule-a0ce0955478573405e4dbb647d0f7713"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SubCategoryLayoutModule-a0ce0955478573405e4dbb647d0f7713"' :
                                            'id="xs-components-links-module-SubCategoryLayoutModule-a0ce0955478573405e4dbb647d0f7713"' }>
                                            <li class="link">
                                                <a href="components/SubCategoryDetailsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SubCategoryDetailsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TagLayoutModule.html" data-type="entity-link">TagLayoutModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TagLayoutModule-7ec42a64a8938c7cd01c70c5caa221c7"' : 'data-target="#xs-components-links-module-TagLayoutModule-7ec42a64a8938c7cd01c70c5caa221c7"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TagLayoutModule-7ec42a64a8938c7cd01c70c5caa221c7"' :
                                            'id="xs-components-links-module-TagLayoutModule-7ec42a64a8938c7cd01c70c5caa221c7"' }>
                                            <li class="link">
                                                <a href="components/TagItemsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TagItemsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TagsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TagsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
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
                                <a href="classes/AbstractCategory.html" data-type="entity-link">AbstractCategory</a>
                            </li>
                            <li class="link">
                                <a href="classes/ActivityDto.html" data-type="entity-link">ActivityDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ActivityModel.html" data-type="entity-link">ActivityModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/AddToCart.html" data-type="entity-link">AddToCart</a>
                            </li>
                            <li class="link">
                                <a href="classes/AppPage.html" data-type="entity-link">AppPage</a>
                            </li>
                            <li class="link">
                                <a href="classes/AuthCredentialsDto.html" data-type="entity-link">AuthCredentialsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/BillingAddress.html" data-type="entity-link">BillingAddress</a>
                            </li>
                            <li class="link">
                                <a href="classes/CancelOrder.html" data-type="entity-link">CancelOrder</a>
                            </li>
                            <li class="link">
                                <a href="classes/CartModel.html" data-type="entity-link">CartModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/CartProductModel.html" data-type="entity-link">CartProductModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/CategoryDto.html" data-type="entity-link">CategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CategoryModel.html" data-type="entity-link">CategoryModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/ChangeProfileImage.html" data-type="entity-link">ChangeProfileImage</a>
                            </li>
                            <li class="link">
                                <a href="classes/CheckoutOnCart.html" data-type="entity-link">CheckoutOnCart</a>
                            </li>
                            <li class="link">
                                <a href="classes/CheckoutOnSingleProduct.html" data-type="entity-link">CheckoutOnSingleProduct</a>
                            </li>
                            <li class="link">
                                <a href="classes/ClearCartContent.html" data-type="entity-link">ClearCartContent</a>
                            </li>
                            <li class="link">
                                <a href="classes/ClearCartFromStorage.html" data-type="entity-link">ClearCartFromStorage</a>
                            </li>
                            <li class="link">
                                <a href="classes/ClearCategory.html" data-type="entity-link">ClearCategory</a>
                            </li>
                            <li class="link">
                                <a href="classes/ClearInvoicesFromStorage.html" data-type="entity-link">ClearInvoicesFromStorage</a>
                            </li>
                            <li class="link">
                                <a href="classes/ClearOrdersFromStorage.html" data-type="entity-link">ClearOrdersFromStorage</a>
                            </li>
                            <li class="link">
                                <a href="classes/ClearPaymentsFromStorage.html" data-type="entity-link">ClearPaymentsFromStorage</a>
                            </li>
                            <li class="link">
                                <a href="classes/ClearProducts.html" data-type="entity-link">ClearProducts</a>
                            </li>
                            <li class="link">
                                <a href="classes/ClearProfileData.html" data-type="entity-link">ClearProfileData</a>
                            </li>
                            <li class="link">
                                <a href="classes/ClearSubCategory.html" data-type="entity-link">ClearSubCategory</a>
                            </li>
                            <li class="link">
                                <a href="classes/ClearTags.html" data-type="entity-link">ClearTags</a>
                            </li>
                            <li class="link">
                                <a href="classes/Contact.html" data-type="entity-link">Contact</a>
                            </li>
                            <li class="link">
                                <a href="classes/ContactMessageDto.html" data-type="entity-link">ContactMessageDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Content.html" data-type="entity-link">Content</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCartProductDto.html" data-type="entity-link">CreateCartProductDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePaymentDto.html" data-type="entity-link">CreatePaymentDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateProfileDto.html" data-type="entity-link">CreateProfileDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserCart.html" data-type="entity-link">CreateUserCart</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserProfile.html" data-type="entity-link">CreateUserProfile</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteProfileImage.html" data-type="entity-link">DeleteProfileImage</a>
                            </li>
                            <li class="link">
                                <a href="classes/EditProfile.html" data-type="entity-link">EditProfile</a>
                            </li>
                            <li class="link">
                                <a href="classes/EmailLoginDto.html" data-type="entity-link">EmailLoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ErrorMessages.html" data-type="entity-link">ErrorMessages</a>
                            </li>
                            <li class="link">
                                <a href="classes/FetchAllCategories.html" data-type="entity-link">FetchAllCategories</a>
                            </li>
                            <li class="link">
                                <a href="classes/FetchAllSubCategories.html" data-type="entity-link">FetchAllSubCategories</a>
                            </li>
                            <li class="link">
                                <a href="classes/FetchCategoryById.html" data-type="entity-link">FetchCategoryById</a>
                            </li>
                            <li class="link">
                                <a href="classes/FetchCustomProducts.html" data-type="entity-link">FetchCustomProducts</a>
                            </li>
                            <li class="link">
                                <a href="classes/FetchInvoiceById.html" data-type="entity-link">FetchInvoiceById</a>
                            </li>
                            <li class="link">
                                <a href="classes/FetchLatestProducts.html" data-type="entity-link">FetchLatestProducts</a>
                            </li>
                            <li class="link">
                                <a href="classes/FetchMixLatestProducts.html" data-type="entity-link">FetchMixLatestProducts</a>
                            </li>
                            <li class="link">
                                <a href="classes/FetchMostSalesProducts.html" data-type="entity-link">FetchMostSalesProducts</a>
                            </li>
                            <li class="link">
                                <a href="classes/FetchOrderById.html" data-type="entity-link">FetchOrderById</a>
                            </li>
                            <li class="link">
                                <a href="classes/FetchPaymentById.html" data-type="entity-link">FetchPaymentById</a>
                            </li>
                            <li class="link">
                                <a href="classes/FetchProductById.html" data-type="entity-link">FetchProductById</a>
                            </li>
                            <li class="link">
                                <a href="classes/FetchProductsByTagName.html" data-type="entity-link">FetchProductsByTagName</a>
                            </li>
                            <li class="link">
                                <a href="classes/FetchProductsTags.html" data-type="entity-link">FetchProductsTags</a>
                            </li>
                            <li class="link">
                                <a href="classes/FetchShopProducts.html" data-type="entity-link">FetchShopProducts</a>
                            </li>
                            <li class="link">
                                <a href="classes/FetchSubCategoriesByTagName.html" data-type="entity-link">FetchSubCategoriesByTagName</a>
                            </li>
                            <li class="link">
                                <a href="classes/FetchSubCategoriesTags.html" data-type="entity-link">FetchSubCategoriesTags</a>
                            </li>
                            <li class="link">
                                <a href="classes/FetchSubCategoryById.html" data-type="entity-link">FetchSubCategoryById</a>
                            </li>
                            <li class="link">
                                <a href="classes/FetchTagById.html" data-type="entity-link">FetchTagById</a>
                            </li>
                            <li class="link">
                                <a href="classes/FetchUserCart.html" data-type="entity-link">FetchUserCart</a>
                            </li>
                            <li class="link">
                                <a href="classes/FetchUserInvoices.html" data-type="entity-link">FetchUserInvoices</a>
                            </li>
                            <li class="link">
                                <a href="classes/FetchUserOrders.html" data-type="entity-link">FetchUserOrders</a>
                            </li>
                            <li class="link">
                                <a href="classes/FetchUserPayments.html" data-type="entity-link">FetchUserPayments</a>
                            </li>
                            <li class="link">
                                <a href="classes/FetchUserProfile.html" data-type="entity-link">FetchUserProfile</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetProductsByRangeDto.html" data-type="entity-link">GetProductsByRangeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GlobalDataDto.html" data-type="entity-link">GlobalDataDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/InsertTagDto.html" data-type="entity-link">InsertTagDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/InvoiceModel.html" data-type="entity-link">InvoiceModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/ItemTag.html" data-type="entity-link">ItemTag</a>
                            </li>
                            <li class="link">
                                <a href="classes/Key.html" data-type="entity-link">Key</a>
                            </li>
                            <li class="link">
                                <a href="classes/Login.html" data-type="entity-link">Login</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginResponse.html" data-type="entity-link">LoginResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/Logout.html" data-type="entity-link">Logout</a>
                            </li>
                            <li class="link">
                                <a href="classes/Message.html" data-type="entity-link">Message</a>
                            </li>
                            <li class="link">
                                <a href="classes/Notification.html" data-type="entity-link">Notification</a>
                            </li>
                            <li class="link">
                                <a href="classes/NotificationData.html" data-type="entity-link">NotificationData</a>
                            </li>
                            <li class="link">
                                <a href="classes/NotificationEntity.html" data-type="entity-link">NotificationEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/NotificationPayload.html" data-type="entity-link">NotificationPayload</a>
                            </li>
                            <li class="link">
                                <a href="classes/NotificationPayloadDto.html" data-type="entity-link">NotificationPayloadDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/OrderDto.html" data-type="entity-link">OrderDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/OrderItemModel.html" data-type="entity-link">OrderItemModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/OrderModel.html" data-type="entity-link">OrderModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaymentModel.html" data-type="entity-link">PaymentModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProductModel.html" data-type="entity-link">ProductModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProductsCustomFilterDto.html" data-type="entity-link">ProductsCustomFilterDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProductTagModel.html" data-type="entity-link">ProductTagModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProfileModel.html" data-type="entity-link">ProfileModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/PushInvoice.html" data-type="entity-link">PushInvoice</a>
                            </li>
                            <li class="link">
                                <a href="classes/PushOrder.html" data-type="entity-link">PushOrder</a>
                            </li>
                            <li class="link">
                                <a href="classes/PushPayment.html" data-type="entity-link">PushPayment</a>
                            </li>
                            <li class="link">
                                <a href="classes/Register.html" data-type="entity-link">Register</a>
                            </li>
                            <li class="link">
                                <a href="classes/RemoveCartProduct.html" data-type="entity-link">RemoveCartProduct</a>
                            </li>
                            <li class="link">
                                <a href="classes/RemoveProductsFromCart.html" data-type="entity-link">RemoveProductsFromCart</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResetPasswordDto.html" data-type="entity-link">ResetPasswordDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SetCustomerToken.html" data-type="entity-link">SetCustomerToken</a>
                            </li>
                            <li class="link">
                                <a href="classes/SetProfileImage.html" data-type="entity-link">SetProfileImage</a>
                            </li>
                            <li class="link">
                                <a href="classes/SetUserCart.html" data-type="entity-link">SetUserCart</a>
                            </li>
                            <li class="link">
                                <a href="classes/SetUserProfile.html" data-type="entity-link">SetUserProfile</a>
                            </li>
                            <li class="link">
                                <a href="classes/SubCategoryDto.html" data-type="entity-link">SubCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SubCategoryModel.html" data-type="entity-link">SubCategoryModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/SubCategoryTagModel.html" data-type="entity-link">SubCategoryTagModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/Subscriber.html" data-type="entity-link">Subscriber</a>
                            </li>
                            <li class="link">
                                <a href="classes/SubscribersNotifications.html" data-type="entity-link">SubscribersNotifications</a>
                            </li>
                            <li class="link">
                                <a href="classes/TagDto.html" data-type="entity-link">TagDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/TagModel.html" data-type="entity-link">TagModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCartProductQuantity.html" data-type="entity-link">UpdateCartProductQuantity</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCartState.html" data-type="entity-link">UpdateCartState</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateOrder.html" data-type="entity-link">UpdateOrder</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateProductDto.html" data-type="entity-link">UpdateProductDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateShopProducts.html" data-type="entity-link">UpdateShopProducts</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateToken.html" data-type="entity-link">UpdateToken</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUser.html" data-type="entity-link">UpdateUser</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserModel.html" data-type="entity-link">UserModel</a>
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
                                    <a href="injectables/AuthService.html" data-type="entity-link">AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthState.html" data-type="entity-link">AuthState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CartService.html" data-type="entity-link">CartService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CartState.html" data-type="entity-link">CartState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CategoryService.html" data-type="entity-link">CategoryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CategoryState.html" data-type="entity-link">CategoryState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ContactService.html" data-type="entity-link">ContactService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GlobalDataService.html" data-type="entity-link">GlobalDataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HelperService.html" data-type="entity-link">HelperService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/InvoiceService.html" data-type="entity-link">InvoiceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/InvoiceState.html" data-type="entity-link">InvoiceState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NotificationsService.html" data-type="entity-link">NotificationsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OrderService.html" data-type="entity-link">OrderService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OrderState.html" data-type="entity-link">OrderState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PaymentService.html" data-type="entity-link">PaymentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PaymentState.html" data-type="entity-link">PaymentState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProductService.html" data-type="entity-link">ProductService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProductState.html" data-type="entity-link">ProductState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProfileService.html" data-type="entity-link">ProfileService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProfileState.html" data-type="entity-link">ProfileState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SearchService.html" data-type="entity-link">SearchService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SubCategoryService.html" data-type="entity-link">SubCategoryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SubCategoryState.html" data-type="entity-link">SubCategoryState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TagService.html" data-type="entity-link">TagService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TagState.html" data-type="entity-link">TagState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TokenService.html" data-type="entity-link">TokenService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/CheckConnectionInterceptor.html" data-type="entity-link">CheckConnectionInterceptor</a>
                            </li>
                            <li class="link">
                                <a href="interceptors/ErrorInterceptor.html" data-type="entity-link">ErrorInterceptor</a>
                            </li>
                            <li class="link">
                                <a href="interceptors/TokenInterceptor.html" data-type="entity-link">TokenInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/UserAuthGuard.html" data-type="entity-link">UserAuthGuard</a>
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
                                <a href="interfaces/AuthStateModel.html" data-type="entity-link">AuthStateModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CartStateModel.html" data-type="entity-link">CartStateModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CategoryStateModel.html" data-type="entity-link">CategoryStateModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CheckoutReturnData.html" data-type="entity-link">CheckoutReturnData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InvoiceStateModel.html" data-type="entity-link">InvoiceStateModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OrderStateModel.html" data-type="entity-link">OrderStateModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PaymentStateModel.html" data-type="entity-link">PaymentStateModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProductStateModel.html" data-type="entity-link">ProductStateModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProfileStateModel.html" data-type="entity-link">ProfileStateModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RemoveCartItem.html" data-type="entity-link">RemoveCartItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SubCategoryStateModel.html" data-type="entity-link">SubCategoryStateModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TagStateModel.html" data-type="entity-link">TagStateModel</a>
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
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
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