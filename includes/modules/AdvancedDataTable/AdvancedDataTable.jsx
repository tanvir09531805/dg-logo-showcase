// External Dependencies
import React, { Component } from 'react';
import axios from 'axios';
import utility from '../../../scripts/df_scripts/utilities';
import DataTable from '../../../public/js/lib/datatables.min.js';
import Papa from 'papaparse';
import $ from 'jquery';
// Internal Dependencies
import './style.css';


class AdvancedDataTable extends Component {

  static slug = 'difl_advanced_data_table';
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      database_data: '',
      tablepress_data: '',
      google_sheet_data: '',
      table_name: '',
      data_error: '',
      csvfile: undefined,
      csv_data: ''
    }

    this.wrapper = React.createRef();
    this.requestDataFromDatabase = this.requestDataFromDatabase.bind(this);
    this.requestDataFromTablepress = this.requestDataFromTablepress.bind(this);
    this.requestDataFromGooglesheet = this.requestDataFromGooglesheet.bind(this);
    this.requestCsvData = this.requestCsvData.bind(this);
    this.updateCsvData = this.updateCsvData.bind(this);
    this.datatable_call = this.datatable_call.bind(this);

    this.computed = ['adt_search', 'adt_paging', 'show_entries', 'adt_order', 'adt_info', 'adt_scroll_x', 'table_type','multi_lang_enable',
      'multi_lang_name' , 'database_tables_list', 'table_press_list', 'google_api_key', 'google_sheet_id',
      'google_sheet_range', 'google_cache_remove']
  }

  requestCsvData() {
    if (this.props['csv_upload_data']) {
      var csvFilePath = this.props['csv_upload_data']

      Papa.parse(csvFilePath, {
        download: true,
        skipEmptyLines: true,
        complete: this.updateCsvData
      });
    }

  }

  updateCsvData(result) {
    const _this = this;
    //const csv_file = _this.props.csv_upload_data;
    if (_this._isMounted) {
      if (_this.props.table_type === 'csv_upload') {
        const data = result.data;
        this.setState({ csv_data: data });
        _this.datatable_call();
      }
    }

  }


  componentDidMount() {
    this._isMounted = true;
    if (this.props.table_type === 'database_table') {
      this.requestDataFromDatabase();
    }
    if (this.props.table_type === 'table_press') {
      this.requestDataFromTablepress();
    }
    if (this.props.table_type === 'google_sheet') {
      this.requestDataFromGooglesheet();
    }
    if (this.props.table_type === 'csv_upload') {
      this.requestCsvData();
    }

    this.datatable_call();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  componentDidUpdate(prevProps, prevState) {

    const _this = this;

    for (const index in prevProps) {

      if (prevProps[index] !== _this.props[index]) {
        if (_this.computed.includes(index)) {
          this.setState({ loading: true });
        }
      }
    }

    // csv textarea props change check
    if (_this.props.import_table_data) {
      if (prevProps['import_table_data'] !== _this.props['import_table_data']) {
        this.setState({ loading: true });
      }
    }
    // csv upload props change check
    if (_this.props.csv_upload_data) {
      if (prevProps['csv_upload_data'] !== _this.props['csv_upload_data']) {
        this.setState({ loading: true });
      }
    }

    var renderDatatable = new Promise((resolve, reject) => {
      if (_this.state.loading === true) {
        if (_this.props.table_type === 'database_table') {
          _this.requestDataFromDatabase();
        }
        if (_this.props.table_type === 'table_press') {
          _this.requestDataFromTablepress();
        }
        if (_this.props.table_type === 'google_sheet') {
          _this.requestDataFromGooglesheet();

        }
        if (_this.props.table_type === 'csv_upload') {

          _this.requestCsvData();

        }
        if (_this.state.google_sheet_data !== '' || _this.state.tablepress_data !== '' || _this.state.database_data !== '' || _this.props['import_table_data'] !== '' || _this.props['csv_upload_data'] !== '' || _this.state.csv_data !== '') {
          this.setState({ loading: false });
          resolve();
        }

      }
    })

    renderDatatable
      .then(() => {
        if (_this.wrapper.current) {
          if (_this.wrapper.current.querySelector('.df_adt_content .df-advanced-table')) {
            if (_this.props['table_type'] === 'import_table' && _this.props['import_table_data'] !== '') {
              _this.datatable_call(_this.wrapper.current.querySelector('.df_adt_content .df-advanced-table'));
            }

          }
        }

      })

  }


  datatable_call(selector = '') {

    const props = this.props;
    const _this = this;
    var dataTableSelector = selector === '' ? _this.wrapper.current.querySelector('.df_adt_content .df-advanced-table') : selector;
    var languagName = (props.multi_lang_enable && props.multi_lang_enable ==='on' && props.multi_lang_name) ? props.multi_lang_name : 'English';
    if (dataTableSelector) {

      const options = {
        // UI Theme Defaults
        searching: 'on' === props.adt_search,
        ordering: 'on' === props.adt_order,
        paging: 'on' === props.adt_paging,
        pageLength: props.show_entries ? parseInt(props.show_entries) : 10,
        info: 'on' === props.adt_info,
        // scrollX: props.adt_scroll_x === 'on' ? true : false,
        language: {
          "url": "https://cdn.datatables.net/plug-ins/1.10.15/i18n/"+ languagName +".json"
        }
      }
     $(dataTableSelector).DataTable(
        options
      );

    }
  }

  requestDataFromDatabase() {
    const _this = this;
    const table_name = _this.props.database_tables_list;

    axios({
      method: 'post',
      url: window.ETBuilderBackend.ajaxUrl,
      params: {
        action: 'action_data_from_database'
      },
      data: {
        et_admin_load_nonce: window.et_fb_options.et_admin_load_nonce,
        table_type: _this.props.table_type,
        table: table_name
      }
    })
      .then((response) => {
        if (_this._isMounted) {

          if (response.data.data !== undefined) {
            if (_this.props.table_type === 'database_table') {
              _this.setState({
                database_data: response.data.data,
                table_name: table_name
              });
              _this.datatable_call();
            }
          } else {
            _this.setState({
              database_data: '',
            });
          }

        }
      })
  }

  requestDataFromTablepress() {
    const _this = this;
    const table_name_tablpress = _this.props.table_press_list;

    axios({
      method: 'post',
      url: window.ETBuilderBackend.ajaxUrl,
      params: {
        action: 'action_data_from_tablepress'
      },
      data: {
        et_admin_load_nonce: window.et_fb_options.et_admin_load_nonce,
        table_type: _this.props.table_type,
        table: table_name_tablpress
      }
    })
      .then((response) => {
        if (_this._isMounted) {
          if (response.data.data !== undefined) {

            if (_this.props.table_type === 'table_press') {
              _this.setState({
                tablepress_data: response.data.data,
                table_name: table_name_tablpress
              });
              _this.datatable_call();
            }

          }
          else {
            _this.setState({
              tablepress_data: '',
            });
          }

        }
      })

  }

  requestDataFromGooglesheet() {
    const _this = this;
    const google_api_key = _this.props.google_api_key !== '' ? _this.props.google_api_key : ''
    const google_sheet_id = _this.props.google_sheet_id !== '' ? _this.props.google_sheet_id : ''
    const google_sheet_range = _this.props.google_sheet_range !== '' ? _this.props.google_sheet_range : ''
    const google_cache_remove = _this.props.google_cache_remove === 'on' ? true : false;

    axios({
      method: 'post',
      url: window.ETBuilderBackend.ajaxUrl,
      params: {
        action: 'action_data_from_google_sheet'
      },
      data: {
        et_admin_load_nonce: window.et_fb_options.et_admin_load_nonce,
        table_type: _this.props.table_type,
        google_api_key: google_api_key,
        google_sheet_id: google_sheet_id,
        google_sheet_range: google_sheet_range,
        google_cache_remove: google_cache_remove,
        id: '',

      }
    })
      .then((response) => {
        if (_this._isMounted) {
          if (response.data.data !== undefined) {

            if (_this.props.table_type === 'google_sheet') {
              _this.setState({
                google_sheet_data: response.data.data
              });
              _this.datatable_call();
            }

          }
          else {
            _this.setState({
              google_sheet_data: '',
              data_error: response.data.error,
            });
          }

        }
      })

  }


  database_table_head_function(columns) {
    var data = '';
    for (var key in columns) {
      data += `<th class="df-advanced-table__head-column-cell">${key}</th>`;
    }
    return data;
  }
  database_table_body_function(table_rows) {
    var tr_html = '';
    for (var i = 0; i < table_rows.length; i++) {

      var tr_td_html = '';
      var rows = table_rows[i];
      for (var key in rows) {
		  const style = 'on' === this.props['keep_line_break'] ? 'white-space:pre-wrap ' : "";
        tr_td_html += `<td class="df-advanced-table__body-row-cell" style=${style} >${rows[key]}</td>`;
      }
      tr_html += `<tr class="df-advanced-table__body-row"> ${tr_td_html} </tr>`;

    }

    return tr_html;
  }

  database_table_render(props) {
    if (this.state.database_data === '') {
      return `<div class="df-data-table-error">Select Table.</div>`;
    }
    if (this.state.database_data !== '') {
      let table_data = this.state.database_data;
      if (table_data.error) {
        return table_data.error;
      }
      const columns = table_data[0]
      const table_rows = table_data;
      let table_html = `<table class="df-advanced-table">
        <thead class="df-advanced-table__head">
          <tr class="df-advanced-table__head-column">
            ${this.database_table_head_function(columns)}
          </tr>
        </thead>
        <tbody class="df-advanced-table__body">
          ${this.database_table_body_function(table_rows)}
        </tbody>
      </table>`;

      return table_html;
    }
  }
  tablepress_table_head_function(columns) {
    var data = '';
    for (var key in columns) {
      data += `<th class="df-advanced-table__head-column-cell">${columns[key]}</th>`;
    }
    return data;
  }
  tablepress_table_body_function(table_rows) {
    var tr_html = '';
    for (var i = 1; i < table_rows.length; i++) {

      var tr_td_html = '';
      var rows = table_rows[i];
      for (var key in rows) {
        tr_td_html += `<td class="df-advanced-table__body-row-cell">${rows[key]}</td>`;
      }
      tr_html += `<tr class="df-advanced-table__body-row"> ${tr_td_html} </tr>`;

    }

    return tr_html;
  }
  tablepress_render(props) {
    if (this.state.tablepress_data === '') {
      return `<div class="df-data-table-error">Select Table.</div>`;

    }
    if (this.state.tablepress_data !== '') {
      let table_data = this.state.tablepress_data;

      if (table_data.error) {
        return table_data.error;
      }
      const columns = table_data[0]
      const table_rows = table_data;
      let table_html = `<table class="df-advanced-table">
        <thead class="df-advanced-table__head">
          <tr class="df-advanced-table__head-column">
            ${this.tablepress_table_head_function(columns)}
          </tr>
        </thead>
        <tbody class="df-advanced-table__body">
          ${this.tablepress_table_body_function(table_rows)}
        </tbody>
      </table>`;

      return table_html;
    }

  }

  google_sheet_head_function(columns) {
    var data = '';
    for (var key in columns) {
      data += `<th class="df-advanced-table__head-column-cell">${columns[key]}</th>`;
    }
    return data;
  }
  google_sheet_body_function(table_rows, columns) {
    var tr_html = '';
    for (var i = 0; i < table_rows.length; i++) {
      if (columns.length > table_rows[i].length) {
        const diference = columns.length - table_rows[i].length;

        for (var j = 0; j < diference; j++) {
          table_rows[i].push(null);
        }
      }
      var tr_td_html = '';
      var rows = table_rows[i];
      for (var key in rows) {
        const cell = rows[key] == null ? '' : rows[key];
        tr_td_html += `<td class="df-advanced-table__body-row-cell">${cell}</td>`;
      }
      tr_html += `<tr class="df-advanced-table__body-row"> ${tr_td_html} </tr>`;

    }

    return tr_html;
  }
  google_sheet_render(id) {
    if (this.state.data_error !== '') {
      return `<div class="df-data-table-error">Select Table.</div>`;
    }

    if (this.state.google_sheet_data !== '') {
      var table_data = this.state.google_sheet_data;
      if (table_data.error) {
        return table_data.error;
      }
      if (table_data['values'][0] && table_data['values'][0] !== undefined) {
        const columns = table_data['values'][0];
        var table_row = table_data['values'].filter(function (value, index, arr) {
          return index !== 0;
        });

        let table_html = `<table class="df-advanced-table">
          <thead class="df-advanced-table__head">
            <tr class="df-advanced-table__head-column">
              ${this.google_sheet_head_function(columns)}
            </tr>
          </thead>
          <tbody class="df-advanced-table__body">
            ${this.google_sheet_body_function(table_row, columns)}
          </tbody>
        </table>`;

        return table_html;
      }


    }

  }
  import_table_head_function(columns) {
    var data = '';

    for (var key in columns) {
      data += `<th class="df-advanced-table__head-column-cell">${columns[key]}</th>`;
    }
    return data;
  }
  import_table_body_function(table_rows) {
    var tr_html = '';
    for (var i = 0; i < table_rows.length; i++) {
      var rows = table_rows[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

      var tr_td_html = '';
      for (var key in rows) {
        tr_td_html += `<td class="df-advanced-table__body-row-cell">${rows[key].replace(/["]/g, "")}</td>`;
      }
      tr_html += `<tr class="df-advanced-table__body-row"> ${tr_td_html} </tr>`;

    }

    return tr_html;
  }
  import_table_render(props) {
   
    if (!props['import_table_data']) {
      return '<div class="df-data-table-error">Paste Data in CSV format.</div>';
    }

    let table_data = props['import_table_data'].split("\n");
    const columns = table_data[0].split(',');
    const table_rows = table_data.splice(1, table_data.length);
 
    for (var i = 0; i < table_rows.length; i++) {
      var rows = table_rows[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
      if(rows.length){
        if(rows.length !== columns.length){
          return '<div class="df-data-table-error">Datatable Format does\'t match</div>';
        }
      }

    }
    
    let table_html = `<table class="df-advanced-table">
      <thead class="df-advanced-table__head">
        <tr class="df-advanced-table__head-column"> 
          ${this.import_table_head_function(columns)}
        </tr>
      </thead>
      <tbody class="df-advanced-table__body">
        ${this.import_table_body_function(table_rows)}
      </tbody>
    </table>`;

    return table_html;
  }

  csv_upload_table_head_function(columns) {
    var data = '';
    for (var key in columns) {
      data += `<th class="df-advanced-table__head-column-cell">${columns[key].replace(/`/g, ',').replace(/['"]+/g, '')}</th>`;
    }
    return data;
  }
  csv_upload_table_body_function(table_rows) {
    var tr_html = '';
    for (var i = 0; i < table_rows.length; i++) {
      var rows = table_rows[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
      var tr_td_html = '';
      for (var key in rows) {
        const item = rows[key].replace(/`/g, ',');
        tr_td_html += `<td class="df-advanced-table__body-row-cell">${item.replace(/['"]+/g, '')}</td>`;
      }
      tr_html += `<tr class="df-advanced-table__body-row"> ${tr_td_html} </tr>`;

    }

    return tr_html;
  }
  csv_upload_table_render(props) {
    if (!props['csv_upload_data']) {
      return `<div class="df-data-table-error">Only CSV file will Suport. So Upload CSV file.</div>`;
    }

    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', props['csv_upload_data'], false);
    xhr.send();
    if (xhr.status === "404") {
      return `<div class="df-data-table-error">File isn't available.</div>`;
    }

    const file_type = props['csv_upload_data'].substring(props['csv_upload_data'].lastIndexOf('.') + 1, props['csv_upload_data'].length);

    if (file_type !== "csv") {
      return `<div class="df-data-table-error">Oops! ${file_type} file can't be uploaded, So you have to Upload CSV file.</div>`;
    }
    if (this.state.csv_data !== '') {
      let table_data = this.state.csv_data;
      var mainTable = [];

      for (const [key, value] of Object.entries(table_data)) {
        
        //Comma value filter
        var resultArr = value.map(function(x){return x.replace(/"/g, '""').replace(/,/g, '`');});
        var item = resultArr.toString();
        mainTable.push(item);
      }
      //mainTable.pop();
      mainTable.filter((a) => a);
      const columns = mainTable[0].split(',');
      const table_rows = mainTable.splice(1, mainTable.length);

      let table_html = `<table class="df-advanced-table">
        <thead class="df-advanced-table__head">
          <tr class="df-advanced-table__head-column">
            ${this.csv_upload_table_head_function(columns)}
          </tr>
        </thead>
        <tbody class="df-advanced-table__body">
          ${this.csv_upload_table_body_function(table_rows)}
        </tbody>
      </table>`;

      return table_html;
    }
  }
  
  static css(props) {
    const additionalCss = [];
    additionalCss.push([{
      selector: "%%order_class%% .df_adt_container .df_adt_content",
      declaration: `overflow-x:scroll`,
      'device': 'tablet',
    }]);

    additionalCss.push([{
      selector: "%%order_class%% .df_adt_container .df_adt_content",
      declaration: `overflow-x:scroll`,
      'device': 'phone',
    }]);

    if ('on' === props.make_head_cell_equal_border) {
      additionalCss.push([{
        selector: '%%order_class%% table.df-advanced-table tr.df-advanced-table__head-column .df-advanced-table__head-column-cell:not(:last-child)',
        declaration: `border-right:0px;`,
      }]);
    }

    if ('on' === props.make_row_cell_equal_border) {
      additionalCss.push([{
        selector: '%%order_class%% table.df-advanced-table tr.df-advanced-table__body-row:not(:first-child) .df-advanced-table__body-row-cell',
        declaration: `border-top:0px;`,
      }]);
      additionalCss.push([{
        selector: '%%order_class%%  table.df-advanced-table tr > td.df-advanced-table__body-row-cell:not(:last-child)',
        declaration: `border-right:0px;`,
      }]);
    }

    if ('on' === props.make_row_last_cell_border_right_0) {
      additionalCss.push([{
        selector: '%%order_class%% table.df-advanced-table tr > td.df-advanced-table__body-row-cell:last-child, %%order_class%% table.df-advanced-table tr.df-advanced-table__head-column .df-advanced-table__head-column-cell:last-child',
        declaration: `border-right:0px;`,
      }]);
    }

    if ('on' === props.make_row_first_cell_border_left_0) {
      additionalCss.push([{
        selector: '%%order_class%% table.df-advanced-table tr > td.df-advanced-table__body-row-cell:first-child , %%order_class%% table.df-advanced-table tr.df-advanced-table__head-column .df-advanced-table__head-column-cell:first-child',
        declaration: `border-left:0px;`,
      }]);
    }

    if ('on' === props.make_first_row_all_cell_border_top_0) {
      additionalCss.push([{
        selector: '%%order_class%% table.df-advanced-table tr.df-advanced-table__head-column .df-advanced-table__head-column-cell',
        declaration: `border-top:0px;`,
      }]);
    }

    if ('on' === props.make_last_row_all_cell_border_bottom_0) {
      additionalCss.push([{
        selector: '%%order_class%% table.df-advanced-table tr:last-child td.df-advanced-table__body-row-cell',
        declaration: `border-bottom:0px;`,
      }]);
    }
    // Margin Padding
    utility.process_range_value({
      'props': props,
      'key': 'pagination_spacing',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% table.dataTable',
      'type': 'margin-bottom',
      'default_value': '0',
    });

    utility.process_range_value({
      'props': props,
      'key': 'between_button_spacing',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .dataTables_paginate a:not(.next)',
      'type': 'margin-right',
      'default_value': '10',
    });

    utility.process_range_value({
      'props': props,
      'key': 'between_button_spacing',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .dataTables_paginate a:not(.previous)',
      'type': 'margin-left',
      'default_value': '10',
    });

    utility.process_range_value({
      'props': props,
      'key': 'search_lebel_spacing',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .dataTables_wrapper .dataTables_filter input',
      'type': 'margin-left',
      'default_value': '10',
    });

    utility.process_range_value({
      'props': props,
      'key': 'pagination_dot_size',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .dataTables_wrapper .dataTables_paginate .ellipsis',
      'type': 'font-size',
      'default_value': '14px',
    });

    utility.process_range_value({
      'props': props,
      'key': 'image_size',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% tr td.df-advanced-table__body-row-cell img , %%order_class%% tr th.df-advanced-table__head-column-cell img',
      'type': 'width',
      'default_value': '50%',
    });

    utility.process_range_value({
      'props': props,
      'key': 'icon_size',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% tr td.df-advanced-table__body-row-cell span',
      'type': 'font-size',
      'default_value': '40px',
    });

    utility.process_margin_padding({
      'props': props,
      'key': 'table_padding',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% table.dataTable',
      'type': 'padding',
      'important': false
    });

    utility.process_margin_padding({
      'props': props,
      'key': 'table_wrapper_padding',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_adt_container',
      'type': 'padding',
      'important': false
    });

    utility.process_margin_padding({
      'props': props,
      'key': 'search_padding',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_adt_container .dataTables_wrapper .dataTables_filter',
      'type': 'padding',
      'important': false
    });

    utility.process_margin_padding({
      'props': props,
      'key': 'paging_info_padding',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_adt_container .dataTables_wrapper .dataTables_length',
      'type': 'padding',
      'important': false
    });

    utility.process_margin_padding({
      'props': props,
      'key': 'paging_bottom_info_padding',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_adt_container .dataTables_wrapper .dataTables_info',
      'type': 'padding',
      'important': false
    });

    utility.process_margin_padding({
      'props': props,
      'key': 'pagination_button_padding',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_adt_container .dataTables_paginate .paginate_button',
      'type': 'padding',
      'important': false
    });

    utility.process_margin_padding({
      'props': props,
      'key': 'head_cell_padding',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df-advanced-table__head-column-cell',
      'type': 'padding',
      'important': true
    });

    utility.process_margin_padding({
      'props': props,
      'key': 'body_cell_padding',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df-advanced-table__body-row-cell',
      'type': 'padding',
      'important': true
    });

    utility.process_margin_padding({
      'props': props,
      'key': 'search_input_padding',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .dataTables_wrapper .dataTables_filter input',
      'type': 'padding',
      'important': false
    });

    utility.process_margin_padding({
      'props': props,
      'key': 'link_padding',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df-advanced-table__body-row-cell a',
      'type': 'padding',
      'important': false
    });

    // Color

    if (props.adt_order === 'on') {
      utility.process_color({
        'props': props,
        'key': 'sorting_icon_color',
        'additionalCss': additionalCss,
        'selector': '%%order_class%% .df-advanced-table .df-advanced-table__head-column-cell.sorting:before',
        'type': 'border-bottom-color',
        'default': '#333'
      })

      utility.process_color({
        'props': props,
        'key': 'sorting_icon_color',
        'additionalCss': additionalCss,
        'selector': '%%order_class%%  .df-advanced-table .df-advanced-table__head-column-cell.sorting_asc:before',
        'type': 'border-bottom-color',
        'default': '#333'
      })

      utility.process_color({
        'props': props,
        'key': 'sorting_icon_color',
        'additionalCss': additionalCss,
        'selector': '%%order_class%% .df-advanced-table .df-advanced-table__head-column-cell.sorting:after',
        'type': 'border-top-color',
        'default': '#333'
      })

      utility.process_color({
        'props': props,
        'key': 'sorting_icon_color',
        'additionalCss': additionalCss,
        'selector': '%%order_class%% .df-advanced-table .df-advanced-table__head-column-cell.sorting_desc:after',
        'type': 'border-top-color',
        'default': '#333'
      })

    }
    utility.process_color({
      'props': props,
      'key': 'icon_color',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% tr td.df-advanced-table__body-row-cell span',
      'type': 'color',
    });

    utility.process_color({
      'props': props,
      'key': 'pagination_dot_color',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .dataTables_wrapper .dataTables_paginate .ellipsis',
      'type': 'color',
    })

    // Background
    utility.df_process_bg({
      'props': props,
      'key': 'search_input_background',
      'additionalCss': additionalCss,
      'default': '#ccc',
      'selector': '%%order_class%% .dataTables_filter input',
    });

    utility.df_process_bg({
      'props': props,
      'key': 'table_background',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df_adt_container',
    });

    utility.df_process_bg({
      'props': props,
      'key': 'head_background',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df-advanced-table__head',
    });

    utility.df_process_bg({
      'props': props,
      'key': 'row_background',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df-advanced-table__body-row',
    });
    utility.df_process_bg({
      'props': props,
      'key': 'row_odd_background',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df-advanced-table__body-row.odd',
    });
    utility.df_process_bg({
      'props': props,
      'key': 'row_even_background',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df-advanced-table__body-row.even',
    });
    utility.df_process_bg({
      'props': props,
      'key': 'paging_button_background',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .dataTables_wrapper .dataTables_paginate a.paginate_button, %%order_class%% .dataTables_wrapper .dataTables_paginate a.paginate_button.disabled , %%order_class%% .dataTables_wrapper .dataTables_paginate a.paginate_button.current'
    });
    utility.df_process_bg({
      'props': props,
      'key': 'paging_active_button_background',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .dataTables_wrapper .dataTables_paginate a.paginate_button.current , %%order_class%% .dataTables_wrapper .dataTables_paginate span a.paginate_button.current',
    });
    utility.df_process_bg({
      'props': props,
      'key': 'info_select_background',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .dataTables_wrapper .dataTables_length select',
    });
    utility.df_process_bg({
      'props': props,
      'key': 'link_background',
      'additionalCss': additionalCss,
      'selector': '%%order_class%% .df-advanced-table__body-row a',
    });
    return additionalCss;
  }
  render() {
    const props = this.props;
    let table_html = '';
    if (props['table_type'] === 'google_sheet') {
      table_html = { __html: this.google_sheet_render('') };
    } else if (props['table_type'] === 'database_table') {
      table_html = { __html: this.database_table_render(props) };
    } else if (props['table_type'] === 'table_press') {
      table_html = { __html: this.tablepress_render(props) };
    } else if (props['table_type'] === 'import_table') {
      table_html = { __html: this.import_table_render(props) };
    }
    else if (props['table_type'] === 'csv_upload') {
      table_html = { __html: this.csv_upload_table_render(props) };
    }

    return (
      <div className="df_adt_container" ref={this.wrapper}>

        {
          this.state.loading === false ?
            <div className="df_adt_content" dangerouslySetInnerHTML={table_html} /> :
            <div className="et-fb-preloader et-fb-preloader__loading">
              <div className="et-fb-loader" />
            </div>
        }

      </div>
    );
  }
}

export default AdvancedDataTable;
