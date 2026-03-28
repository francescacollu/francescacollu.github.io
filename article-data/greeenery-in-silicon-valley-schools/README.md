# Web Visualization Data Exports

This folder contains React-ready data exports for rebuilding the project visualizations.

## Generator Script

- Script: `analysis/export_web_viz_data.py`
- Example run:
  - `python analysis/export_web_viz_data.py --write-csv-mirrors`

## Output Files

- `map_points.json`
  - One record per school for map markers.
  - Fields:
    - `id`
    - `school_name`
    - `city`
    - `lat`
    - `lon`
    - `ndvi_mean`
    - `greenery_index_ndvi_nlcd`
    - `percent_eligible_frpm_k12` (fraction in `[0,1]`)
    - `frpm_quartile_label`
    - `marker_color` (hex color for marker fill/stroke)

- `scatter_greenery_vs_frpm.json`
  - One record per school for scatter plotting.
  - Fields:
    - `id`
    - `school_name`
    - `city`
    - `x_frpm` (fraction in `[0,1]`)
    - `y_greenery_index`

- `conditional_probability_greenery_bins.json`
  - Long-format grouped-bar data for conditional probability chart.
  - Fields:
    - `metric_col`
    - `bin_strategy`
    - `bin_width_pct`
    - `bin_label`
    - `group` (`FRPM-eligible` or `Non-eligible`)
    - `probability`

- `dataset_metadata.json`
  - Export configuration and row counts.

## Optional CSV Mirrors

If generated with `--write-csv-mirrors`, these files are also written:

- `map_points.csv`
- `scatter_greenery_vs_frpm.csv`
- `conditional_probability_greenery_bins.csv`

## React Integration Notes

- **Map**: load `map_points.json` and render markers in React-Leaflet using `lat`, `lon`, and `marker_color`.
- **Scatter**: load `scatter_greenery_vs_frpm.json`; format `x_frpm` as percentage axis labels.
- **Conditional Probability**: load `conditional_probability_greenery_bins.json`; render grouped bars by `group`, x-axis by `bin_label`.
