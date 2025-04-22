// External Dependencies
import React, { Component } from 'react';
import utility from '../../../scripts/df_scripts/utilities';
// Internal Dependencies
import './style.css';

class DataTableItem extends Component {
    static slug = 'difl_datatableitem';
    _isMounted = false;

    constructor(props) {
        super(props);
    }

    static css(props) {
        const additionalCss = [];
        if ('on' === props.full_width_badge) {
            additionalCss.push([{
                selector: 'table.df_dt_content tr%%order_class%% th.df_dt_table_body_column_cell.badge .table_badge',
                declaration: `width:100%;`,
            }]);
        }

        if ('on' !== props.full_width_badge) {
            if ('center' == props['badge_alignment']) {
                additionalCss.push([{
                    selector: 'table.df_dt_content tr%%order_class%% th.df_dt_table_body_column_cell.badge .table_badge',
                    declaration: `left: 50%; transform: translate(-50%, -100%);`,
                }]);
            }
            if ('right' == props['badge_alignment']) {
                additionalCss.push([{
                    selector: 'table.df_dt_content tr%%order_class%% th.df_dt_table_body_column_cell.badge .table_badge',
                    declaration: `right: 0; left: unset;`,
                }]);
            }
        }

        utility.df_process_bg({
            'props': props,
            'key': 'row_background',
            'additionalCss': additionalCss,
            'selector': 'tr%%order_class%% td.df_dt_table_body_column_cell',
            'important': true
        });

        utility.df_process_bg({
            'props': props,
            'key': 'link_background',
            'additionalCss': additionalCss,
            'selector': 'table.df_dt_content %%order_class%% > .df_dt_table_body_column_cell a',
        });

        utility.df_process_bg({
            'props': props,
            'key': 'badge_background',
            'additionalCss': additionalCss,
            'selector': 'table.df_dt_content tr%%order_class%% .df_dt_table_body_column_cell .table_badge',
        });

        utility.process_range_value({
            'props': props,
            'key': 'icon_size',
            'additionalCss': additionalCss,
            'selector': 'table.df_dt_content tr%%order_class%% .df_dt_table_body_column_cell span.et-pb-icon',
            'type': 'font-size',
            'important': true
        });
        utility.process_range_value({
            'props': props,
            'key': 'icon_color',
            'additionalCss': additionalCss,
            'selector': 'table.df_dt_content %%order_class%% .df_dt_table_body_column_cell span.et-pb-icon',
            'type': 'color',
        });

        utility.process_margin_padding({
            'props': props,
            'key': 'link_padding',
            'additionalCss': additionalCss,
            'selector': 'table.df_dt_content %%order_class%% .df_dt_table_body_column_cell a',
            'type': 'padding',
            'important': true
        });

        utility.process_margin_padding({
            'props': props,
            'key': 'icon_margin',
            'additionalCss': additionalCss,
            'selector': 'table.df_dt_content %%order_class%% .df_dt_table_body_column_cell span.et-pb-icon',
            'type': 'margin',
            'important': true
        });

        utility.process_margin_padding({
            'props': props,
            'key': 'badge_margin',
            'additionalCss': additionalCss,
            'selector': 'table.df_dt_content %%order_class%% .df_dt_table_body_column_cell .table_badge',
            'type': 'margin',
            'important': true
        });

        utility.process_margin_padding({
            'props': props,
            'key': 'badge_padding',
            'additionalCss': additionalCss,
            'selector': 'table.df_dt_content %%order_class%% .df_dt_table_body_column_cell .table_badge',
            'type': 'padding',
            'important': true
        });

        return additionalCss;
    }

    render() {
        const props = this.props;
        return false;
    }

}
export default DataTableItem;