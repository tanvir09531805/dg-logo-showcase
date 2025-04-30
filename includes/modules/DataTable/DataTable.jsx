// External Dependencies
import React, { Component, Fragment } from 'react';
import utility from '../../../scripts/df_scripts/utilities';

// Internal Dependencies
import './style.css';

class DataTable extends Component {
    static slug = 'difl_datatable';
    _isMounted = false;

    constructor(props) {
        super(props);

        this.renderTable = this.renderTable.bind(this);
    }

    static css(props) {
        const additionalCss = [];
        const view_mode = window.ET_Builder.API.State.View_Mode;
        if ('on' === props.make_head_cell_equal_border) {
            additionalCss.push([{
                selector: '%%order_class%% table.df_dt_content thead tr th.df_dt_table_body_column_cell:not(:last-child)',
                declaration: `border-right:0px;`,
            }]);
        }
        if ('on' === props.make_foot_cell_equal_border) {
            if (props.responsive_mode === 'off') {
                additionalCss.push([{
                    selector: '%%order_class%% table.df_dt_content tfoot tr .df_dt_table_body_column_cell:not(:last-child)',
                    declaration: `border-right:0px;`,
                }]);
            }
            if (props.responsive_mode === 'on' && !view_mode.isPhone()) {
                additionalCss.push([{
                    selector: '%%order_class%% table.df_dt_content tfoot tr .df_dt_table_body_column_cell:not(:last-child)',
                    declaration: `border-right:0px;`,
                }]);
            }

            if (props.responsive_mode === 'on' && view_mode.isPhone()) {
                additionalCss.push([{
                    selector: '%%order_class%% table.df_dt_content tfoot tr .df_dt_table_body_column_cell:first-child',
                    declaration: `border-bottom:0px;`,
                }]);
            }

            additionalCss.push([{
                selector: '%%order_class%% table.df_dt_content tfoot tr:last-child .df_dt_table_body_column_cell',
                declaration: `border-top:0px;`,
            }]);

        }
        if ('on' === props.make_row_cell_equal_border) {

            if (props.responsive_mode === 'on' && !view_mode.isPhone()) {
                additionalCss.push([{
                    selector: '%%order_class%% table.df_dt_content tbody tr:first-child .df_dt_table_body_column_cell',
                    declaration: `border-top:0px;`,
                }]);
                additionalCss.push([{
                    selector: '%%order_class%%  table.df_dt_content tbody tr > td.df_dt_table_body_column_cell:not(:last-child)',
                    declaration: `border-right:0px;`,
                }]);
            }
            if (props.responsive_mode === 'off') {
                additionalCss.push([{
                    selector: '%%order_class%% table.df_dt_content tbody tr:first-child .df_dt_table_body_column_cell',
                    declaration: `border-top:0px;`,
                }]);
                additionalCss.push([{
                    selector: '%%order_class%%  table.df_dt_content tbody tr > td.df_dt_table_body_column_cell:not(:last-child)',
                    declaration: `border-right:0px;`,
                }]);
            }

            if (props.responsive_mode === 'on' && view_mode.isPhone()) {
                additionalCss.push([{
                    selector: '%%order_class%% table.df_dt_content tbody tr:last-child .df_dt_table_body_column_cell:not(:last-child)',
                    declaration: `border-bottom:0px;`,
                }]);
            }
            additionalCss.push([{
                selector: '%%order_class%% table.df_dt_content tbody tr:not(:last-child) .df_dt_table_body_column_cell',
                declaration: `border-bottom:0px;`,
            }]);

        }

        if ('on' === props.make_row_last_cell_border_right_0) {
            additionalCss.push([{
                selector: '%%order_class%% table.df_dt_content tr > td.df_dt_table_body_column_cell:last-child',
                declaration: `border-right:0px;`,
            }]);
        }

        if ('on' === props.make_row_first_cell_border_left_0) {
            additionalCss.push([{
                selector: '%%order_class%% table.df_dt_content tr > td.df_dt_table_body_column_cell:first-child',
                declaration: `border-left:0px;`,
            }]);
        }

        utility.process_range_value({
            'props': props,
            'key': 'image_size',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% tr .df_dt_table_body_column_cell img',
            'type': 'width',
            'default_value': '50%',
        });
        utility.process_range_value({
            'props': props,
            'key': 'icon_size',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% tr .df_dt_table_body_column_cell span.et-pb-icon',
            'type': 'font-size',
            'default_value': '40px',
        });
        utility.process_range_value({
            'props': props,
            'key': 'icon_color',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% tr .df_dt_table_body_column_cell span.et-pb-icon',
            'type': 'color',
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'table_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df_dt_content',
            'type': 'padding',
            'important': false
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'head_cell_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% table.df_dt_content thead tr th.df_dt_table_body_column_cell',
            'type': 'padding',
            'important': false
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'body_cell_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% table.df_dt_content tbody tr td.df_dt_table_body_column_cell',
            'type': 'padding',
            'important': false
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'foot_cell_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% table.df_dt_content tfoot tr td.df_dt_table_body_column_cell',
            'type': 'padding',
            'important': false
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'row_first_cell_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% table.df_dt_content tr > .df_dt_table_body_column_cell:first-child',
            'type': 'padding',
            'important': false
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'row_last_cell_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% table.df_dt_content tr > .df_dt_table_body_column_cell:last-child',
            'type': 'padding',
            'important': false
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'link_padding',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df_dt_table_body_column_cell a',
            'type': 'padding',
            'important': false
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'image_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df_dt_table_body_column_cell img',
            'type': 'margin',
            'important': false
        });
        utility.process_margin_padding({
            'props': props,
            'key': 'icon_margin',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df_dt_table_body_column_cell span.et-pb-icon',
            'type': 'margin',
            'important': false
        });
        utility.df_process_bg({
            'props': props,
            'key': 'head_background',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% table.df_dt_content thead tr th.df_dt_table_body_column_cell',
        });
        utility.df_process_bg({
            'props': props,
            'key': 'row_background',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% table.df_dt_content tbody tr td.df_dt_table_body_column_cell',
        });
        utility.df_process_bg({
            'props': props,
            'key': 'row_even_background',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% table.df_dt_content tbody tr:nth-child(2n+2) td.df_dt_table_body_column_cell',
        });
        utility.df_process_bg({
            'props': props,
            'key': 'row_odd_background',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% table.df_dt_content tbody tr:nth-child(2n+1) td.df_dt_table_body_column_cell',
        });
        utility.df_process_bg({
            'props': props,
            'key': 'row_first_column_background',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% table.df_dt_content tr:nth-child(n) > .df_dt_table_body_column_cell:not(.exclude_head_foot):first-child',
        });
        utility.df_process_bg({
            'props': props,
            'key': 'row_last_column_background',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% table.df_dt_content tr:nth-child(n) > .df_dt_table_body_column_cell:not(.exclude_head_foot_last_col):last-child',
        });
        utility.df_process_bg({
            'props': props,
            'key': 'footer_background',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% table.df_dt_content tfoot tr td.df_dt_table_body_column_cell',
        });
        utility.df_process_bg({
            'props': props,
            'key': 'link_background',
            'additionalCss': additionalCss,
            'selector': '%%order_class%% .df_dt_table_body_column_cell a',
        });

        return additionalCss;
    }

    contentOutput(props) {
        return props.content.length !== 0 ? props.content : '';
    }

    renderTable() {
        const childs_content = this.props.content;
        let tableMarkupBody = ``;
        let tableMarkupHead = ``;
        let tableMarkupFoot = ``;
        let tableMarkupRow = ``;
        let tableMarkup = ``;
        if (!childs_content) return;
        var headItem = '';
        headItem = (this.props.responsive_mode === 'on' && childs_content[0] && childs_content[0].props.attrs.row ) ? childs_content[0].props.attrs.row.replace("\r", "").split("\n") : '';

        childs_content.map((data, index) => {
            const utils = window.ET_Builder.API.Utils;
            const item_props = data.props.attrs;

            const rowItemList = item_props.row;
            const order_class = childs_content[index].props.matching.slug + '_' + childs_content[index].props.shortcode_index;
            const module_vb_class = ' et-module-' + data.props._key;
            if (!rowItemList) return;
            let columnCount = [];
            let tableDataArray = [];

            var rowData = rowItemList.replace("\r", "").split("\n");

            columnCount = rowData.length;
            tableDataArray = rowData;
            const parent_props = childs_content[index].props.attrs;

            if (parent_props.row_type === 'head') {
                tableMarkupHead += `<tr class="${order_class + module_vb_class}">`;
            } else if (parent_props.row_type === 'foot') {
                tableMarkupFoot += `<tr class="${order_class + module_vb_class}">`;
            } else {
                tableMarkupBody += `<tr class="${order_class + module_vb_class}">`;
            }

            for (var i = 0; i < columnCount; i++) {

                let column_class = '';
                let row_span_code = ``;
                if (i === 0 && item_props['enable_row_merge'] === 'on' && item_props['body_row_span_item_value'] !== '') {

                    row_span_code = `rowspan="${item_props['body_row_span_item_value']}" `;
                } else {
                    row_span_code = ``;
                }

                let body_col_span_code = ``;
                if (item_props['enable_column_merge'] === 'on' && i + 1 == item_props['body_col_span_item'] && item_props['body_col_span_item_value'] !== '') {

                    body_col_span_code = `colspan="${item_props['body_col_span_item_value']}" `
                } else {
                    body_col_span_code = ``;
                }

                column_class = "df_dt_table_body_column_cell";
                let dataLevel;
                if (index !== 0 && headItem) {
                    var isHTML = RegExp.prototype.test.bind(/(<([^>]+)>)/i);
                    dataLevel = isHTML(headItem[i]) ? '' : headItem[i];
                    // dataLevel = escape(headItem[i]);
                } else {
                    dataLevel = '';
                }
                let tag = 'td';

                if (parent_props.row_type === 'head') {
                    tag = 'th';
                }

                if (parent_props.row_type === 'head') {
                    if (this.props.exclude_head_foot === 'on') {
                        column_class += " exclude_head_foot";
                    }
                    if (this.props.exclude_head_foot_last_col === 'on') {
                        column_class += " exclude_head_foot_last_col";
                    }
                    let badge_text_html = '';
                    if (parent_props.badge_enable === 'on' && i + 1 == parent_props.badge_position && parent_props.badge !== '') {
                        badge_text_html += `<div class="table_badge"><span class="table_badge_text">${parent_props.badge}</span></div>`;
                        column_class += ' badge';
                    }
                    tableMarkupHead += `<${tag} data-label="${dataLevel}" ${row_span_code} ${body_col_span_code} class="${column_class}"> ${badge_text_html} ${rowData[i]} </${tag}>`;

                }
                else if (parent_props.row_type === 'foot') {
                    if (this.props.exclude_head_foot === 'on') {
                        column_class += " exclude_head_foot";
                    }
                    if (this.props.exclude_head_foot_last_col === 'on') {
                        column_class += " exclude_head_foot_last_col";
                    }
                    tableMarkupFoot += `<${tag} data-label="${dataLevel}" ${row_span_code} ${body_col_span_code} class="${column_class}"> ${rowData[i]} </${tag}>`;

                } else {
                    tableMarkupBody += `<${tag} data-label="${dataLevel}" ${row_span_code} ${body_col_span_code} class="${column_class}"> ${rowData[i]} </${tag}>`;

                }
            }

            // tableMarkupRow += `</tr>`;
            tableMarkupHead += `</tr>`;
            tableMarkupBody += `</tr>`;
            tableMarkupFoot += `</tr>`;

        })
        tableMarkup = `<table>
                            <thead>${tableMarkupHead}</thead>
                            <tbody>${tableMarkupBody}</tbody>
                            <tfoot>${tableMarkupFoot}</tfoot>
                         </table>`
        return { __html: tableMarkup };
    }
    render() {
        const props = this.props;
        const responsive_mode = props.responsive_mode === 'on' ? 'responsive_mode_active' : 'scroll_mode_active';
        return (
            <Fragment>
                <div className={"df_dt_container " + responsive_mode} >
                    <div className="df_dt_wrapper">
                        <table className="df_dt_content" dangerouslySetInnerHTML={this.renderTable()} />
                    </div>
                </div>
                <div style={{ display: 'none' }}>
                    {props.content}
                </div>
            </Fragment>
        );
    }
}
export default DataTable;