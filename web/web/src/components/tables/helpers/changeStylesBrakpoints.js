import { css } from 'styled-components';

export const styledTable = css`

  .responsiveTable table,
  .responsiveTable thead,
  .responsiveTable tbody,
  .responsiveTable th,
  .responsiveTable td,
  .responsiveTable tr {
    display: block;
  }

  .responsiveTable thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
    border-bottom: 2px solid #333;
  }

  .responsiveTable tbody tr {
    border: 1px solid #000;
    padding: 0.25em;
  }

  .responsiveTable td.pivoted {
    /* Behave like a "row" */
    border: none !important;
    position: relative;
    padding-left: calc(50% + 10px) !important;
    text-align: left !important;
    white-space: pre-wrap;
    overflow-wrap: break-word;
  }

  .responsiveTable td .tdBefore {
    /* Now like a table header */
    position: absolute;
    display: block;

    /* Top/left values mimic padding */
    left: 1rem;
    width: calc(50% - 20px);
    white-space: pre-wrap;
    overflow-wrap: break-word;
    text-align: left !important;
    font-weight: 600;
  }
`;
