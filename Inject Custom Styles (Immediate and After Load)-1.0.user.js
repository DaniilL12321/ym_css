// ==UserScript==
// @name         Inject Custom Styles for Yandex Metrika
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Добавляет стили для темной темы при загрузке страницы и после полной загрузки на Яндекс Метрику
// @author       DaniilL12321
// @match        https://metrika.yandex.ru/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    const darkThemeStyles = `
        :root {
            --clr-bg-gray-1: #121212 !important;
            --clr-bg-gray-2: #1e1e1e !important;
            --clr-bg-gray-3: #242424 !important;
            --clr-bg-gray-200: #2b2b2b !important;
            --clr-el-gray-000: #1e1e1e !important;
            --clr-el-gray-010: #d1d1d1 !important;
            --clr-el-gray-020: #2b2b2b !important;
            --clr-el-gray-080: #e5e5e5 !important;
            --clr-el-yellow-100: #fbc02d !important;
            --clr-el-yellow-200: #f9a825 !important;
            --clr-el-blue-100: #64b5f6 !important;
            --clr-el-red-100: #e57373 !important;
            --clr-str-black-800: #121212 !important;
            --clr-str-white-100: #ffffff !important;
            --shdw-popover: 0px 0px 6px rgba(0, 0, 0, 0.7) !important;
            --shdw-tooltip: 0px 4px 8px rgba(0, 0, 0, 0.6) !important;
            --shdw-el-focused: 0 0 0 2px rgba(255, 255, 255, 0.3) !important;
            --clr-el-gray-015: rgba(255, 255, 255, 0.15) !important;
            --clr-el-gray-030: rgba(255, 255, 255, 0.3) !important;
        }

        body, #root, html {
            background-color: var(--clr-bg-gray-1) !important;
        }

        .app {
            background-color: var(--clr-bg-gray-2) !important;
        }

        button {
            border-radius: var(--button-border-radius);
            background-color: var(--clr-bg-gray-3) !important;
            color: var(--clr-el-gray-000) !important;
            border: 1px solid var(--clr-bg-gray-00) !important;
        }

        button:hover {
            border-radius: var(--button-border-radius);
            background-color: var(--clr-bg-gray-200) !important;
        }

        input, textarea {
            background-color: var(--clr-bg-gray-2) !important;
            color: var(--clr-el-gray-000) !important;
            border: 1px solid var(--clr-bg-gray-200) !important;
        }

        a {
            color: var(--clr-el-yellow-100) !important;
        }

        a:hover {
            color: var(--clr-el-yellow-200) !important;
        }

        .navigation__items-group span {
            color: white !important;
        }

        div div svg {
            color: white !important;
        }

        .widget-layout {
            background: #121212 !important;
        }

        .highcharts-background {
            display: none !important;
        }

        div.text-overflow.chart-legend-table__head-content {
            color: #e5e5e5 !important;
        }

        svgpath {
            fill: white !important;
        }

        .app-logo-base__service-name path {
            fill: white !important;
        }

        .highcharts-axis-labels span {
            color: #ffffff99 !important;
            background-color: rgb(255 255 255 / 0%) !important;
        }

        .highcharts-yaxis-labels span {
            color: #ffffff99 !important;
            background-color: rgb(255 255 255 / 0%) !important;
        }

        .widget-layout-header__subtitle {
            color: white !important;
        }

        .side-bar__toggle-text {
            color: white !important;
        }

        .modal_theme_normal .modal__content {
            background: #121212 !important;
        }

        .visitor-info__dim-value {
            color: white !important;
        }

        .visitor-visit-info__metro-station {
            color: #ffffff !important;
        }

        .visitor-visit-info__station-goal-name, .visitor-visit-info__station-product-name {
            color: #a5a5a5 !important;
        }

        .visitor-info__visits-container-date {
            color: white !important;
        }

        .visitor-comment__text {
            color: white !important;
        }

        .visitor-visit-info__detail-value {
            color: #ededed99 !important;
        }

        .visitor-visit-info__details-holder {
            -webkit-box-shadow: inset 0 0 10px rgba(227, 227, 227, .0);
            box-shadow: inset 0 0 10px rgb(67 67 67 / 0%);
            border: 1px solid #fbc02d;
        }

        .table_report_visitors .table__th {
            border: 1px solid #ffffff !important;
            background: #121212 !important;
        }

        .table_report_visitors .table__td .table__td-inner {
            color: white !important;
        }

        .report-page__report-headline {
            color: white !important;
        }

        .radio-button__label_disabled .radio-button__radio-container {
            color: white !important;
        }

        .button_view_transparent-shade .button__shape {
            color: white !important;
        }

        .text-cell__subtitle {
            color: white !important;
        }

        .widget-layout-header-common__subtitle {
            color: #ededed99 !important;
        }

        .chart-legend-table-row-common_gray .chart-legend-table-row-common__cell {
            color: #ededed99 !important;
        }

        .copyright {
            color: #ededed99 !important;
        }

        .lang-select__item-text {
            color: #ededed99 !important;
        }
    `;

    function injectDarkThemeStyles() {
        const styleTagId = 'dark-theme-styles';
        let styleTag = document.getElementById(styleTagId);

        if (!styleTag) {
            styleTag = document.createElement('style');
            styleTag.id = styleTagId;
            styleTag.type = 'text/css';
            styleTag.textContent = darkThemeStyles;
            document.documentElement.appendChild(styleTag);
        }
    }

    function removeDarkThemeStyles() {
        const styleTag = document.getElementById('dark-theme-styles');
        if (styleTag) {
            styleTag.remove();
        }
    }

    function toggleTheme() {
        const isDarkTheme = document.body.classList.contains('dark-theme');
        const toggleCircle = document.getElementById('theme-toggle-circle');

        if (isDarkTheme) {
            document.body.classList.remove('dark-theme');
            removeDarkThemeStyles();
            toggleCircle.style.transform = 'translateX(20px) translateY(-50%)';
        } else {
            document.body.classList.add('dark-theme');
            injectDarkThemeStyles();
            toggleCircle.style.transform = 'translateY(-50%)';
        }
    }

    function createToggleSwitch() {
        const toggleSwitch = document.createElement('div');
        toggleSwitch.style.position = 'fixed';
        toggleSwitch.style.left = '10px';
        toggleSwitch.style.bottom = '50px';
        toggleSwitch.style.zIndex = '9999';
        toggleSwitch.style.width = '50px';
        toggleSwitch.style.height = '30px';
        toggleSwitch.style.backgroundColor = '#ccc';
        toggleSwitch.style.borderRadius = '20px';
        toggleSwitch.style.cursor = 'pointer';
        toggleSwitch.style.transition = 'background-color 0.3s';

        const toggleCircle = document.createElement('div');
        toggleCircle.id = 'theme-toggle-circle';
        toggleCircle.style.width = '20px';
        toggleCircle.style.height = '20px';
        toggleCircle.style.borderRadius = '50%';
        toggleCircle.style.backgroundColor = '#fff';
        toggleCircle.style.position = 'absolute';
        toggleCircle.style.top = '50%';
        toggleCircle.style.left = '10%';
        toggleCircle.style.transform = 'translateY(-50%)';
        toggleCircle.style.transition = 'transform 0.3s';

        toggleSwitch.appendChild(toggleCircle);

        toggleSwitch.addEventListener('click', toggleTheme);

        document.body.appendChild(toggleSwitch);
    }

    window.onload = function() {
        const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDarkMode) {
            document.body.classList.add('dark-theme');
            injectDarkThemeStyles();
        }

        createToggleSwitch();
    };

})();
