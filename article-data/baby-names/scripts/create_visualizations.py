"""
Baby Names Visualization Script
Creates Plotly visualizations with consistent styling for the baby names article.

Outputs JSON to article-data/baby-names/outputs/bundled/ and copies to
src/components/articles/baby_names/charts/ (run npm run sync:article-assets to sync).
"""

import json
import shutil
from pathlib import Path

import pandas as pd
import plotly.graph_objects as go

# article-data/baby-names/
ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = ROOT / "data"
BUNDLED_DIR = ROOT / "outputs" / "bundled"
REPO_ROOT = Path(__file__).resolve().parent.parent.parent.parent
CHARTS_DIR = REPO_ROOT / "src" / "components" / "articles" / "baby_names" / "charts"

# ============================================================================
# CONFIGURATION - Easy to change color palette and styling
# ============================================================================

COLOR_PALETTE = {
    "primary": "#6FA4AF",
    "secondary": "#D97D55",
    "tertiary": "#B8C4A9",
    "multi": ["#6FA4AF", "#D97D55", "#B8C4A9", "#9C89B8", "#F0A6CA"],
}

FONT_CONFIG = {
    "family": "Georgia, sans-serif",
    "title_size": 22,
    "axis_size": 16,
    "legend_size": 14,
    "color": "#000000",
}

CHART_DIMENSIONS = {
    "width": 1000,
    "height": 600,
}


def get_base_layout():
    return {
        "font": {
            "family": FONT_CONFIG["family"],
            "size": FONT_CONFIG["axis_size"],
            "color": FONT_CONFIG["color"],
        },
        "plot_bgcolor": "white",
        "paper_bgcolor": "rgba(0,0,0,0)",
        "width": CHART_DIMENSIONS["width"],
        "height": CHART_DIMENSIONS["height"],
        "xaxis": {
            "gridcolor": "#EBF0F8",
            "linecolor": "#EBF0F8",
            "zerolinecolor": "#EBF0F8",
            "showgrid": True,
            "showline": True,
        },
        "yaxis": {
            "gridcolor": "#EBF0F8",
            "linecolor": "#EBF0F8",
            "zerolinecolor": "#EBF0F8",
            "showgrid": True,
            "showline": True,
        },
    }


def save_chart_json(fig, filename, desktop_title, mobile_title=None):
    """Saves Plotly figure as JSON in outputs/bundled and copies to src charts."""
    if mobile_title is None:
        mobile_title = desktop_title

    fig.layout.meta = {
        "desktop_title": desktop_title,
        "mobile_title": mobile_title,
    }

    chart_data = {
        "data": json.loads(fig.to_json())["data"],
        "layout": json.loads(fig.to_json())["layout"],
        "config": {"responsive": True},
    }

    BUNDLED_DIR.mkdir(parents=True, exist_ok=True)
    CHARTS_DIR.mkdir(parents=True, exist_ok=True)

    bundled_path = BUNDLED_DIR / filename
    charts_path = CHARTS_DIR / filename

    with open(bundled_path, "w", encoding="utf-8") as f:
        json.dump(chart_data, f, indent=2)

    shutil.copy2(bundled_path, charts_path)

    print(f"Chart saved: {bundled_path}")
    print(f"Copied to: {charts_path}")


def create_unique_names_scatter():
    df = pd.read_csv(DATA_DIR / "name_concentration_analysis.csv")

    fig = go.Figure()

    fig.add_trace(
        go.Scatter(
            x=df["year"],
            y=df["total_unique_names"],
            mode="markers",
            marker=dict(
                color=COLOR_PALETTE["primary"],
                size=8,
                opacity=0.7,
                line=dict(color="white", width=1),
            ),
            name="Unique Names",
            hovertemplate="<b>Year: %{x}</b><br>"
            + "Unique Names: %{y:,}<br>"
            + "<extra></extra>",
        )
    )

    layout = get_base_layout()
    layout.update(
        {
            "title": {
                "text": "<b>The Rise of Name Diversity</b><br>"
                + "<sub>Number of unique baby names given in the US by year (1880-2024)</sub>",
                "font": {
                    "size": FONT_CONFIG["title_size"],
                    "color": FONT_CONFIG["color"],
                },
                "x": 0.5,
                "xanchor": "center",
            },
            "xaxis": {
                **layout["xaxis"],
                "title": {"text": "Year", "font": {"size": FONT_CONFIG["axis_size"]}},
                "dtick": 20,
            },
            "yaxis": {
                **layout["yaxis"],
                "title": {
                    "text": "Number of Unique Names",
                    "font": {"size": FONT_CONFIG["axis_size"]},
                },
                "tickformat": ",",
            },
            "showlegend": False,
            "hovermode": "closest",
        }
    )

    fig.update_layout(layout)

    save_chart_json(
        fig,
        "unique_names_scatter.json",
        desktop_title="<b>The Rise of Name Diversity</b><br>"
        + "<sub>Number of unique baby names given in the US by year (1880-2024)</sub>",
        mobile_title="<b>The Rise of<br>Name Diversity</b>",
    )

    return fig


def create_name_concentration_waffle():
    df = pd.read_csv(DATA_DIR / "name_concentration_analysis.csv")

    selected_years = [1880, 1920, 1960, 2000, 2024]
    df_selected = df[df["year"].isin(selected_years)].copy()

    fig = go.Figure()

    total_squares = 20
    square_size = 1.0
    gap = 0.15

    year_spacing = 3

    gender_colors = {
        "M": COLOR_PALETTE["primary"],
        "F": COLOR_PALETTE["secondary"],
    }

    all_annotations = []

    for idx, (_, row) in enumerate(df_selected.iterrows()):
        year = int(row["year"])
        top1_pct = row["top1_pct"]
        top1_name = row["top1_name"]
        top1_gender = row["top1_gender"]

        filled_squares = int(round((top1_pct / 100) * total_squares))

        x_pos = idx * year_spacing

        fill_color = gender_colors.get(top1_gender, COLOR_PALETTE["primary"])

        for i in range(total_squares):
            is_filled = i < filled_squares

            y_pos = i * (square_size + gap)

            fig.add_trace(
                go.Scatter(
                    x=[x_pos],
                    y=[y_pos + square_size / 2],
                    mode="markers",
                    marker=dict(
                        symbol="square",
                        size=30,
                        color=fill_color if is_filled else "#E8E8E8",
                        line=dict(width=0.5, color="white"),
                    ),
                    showlegend=False,
                    hoverinfo="skip",
                )
            )

        gender_symbol = "\u2642" if top1_gender == "M" else "\u2640"
        all_annotations.append(
            dict(
                x=x_pos,
                y=-1.5,
                text=f"<b>{year}</b><br>{top1_name} {gender_symbol}<br>{top1_pct:.1f}%",
                showarrow=False,
                font=dict(size=14, color="#000000", family=FONT_CONFIG["family"]),
                xanchor="center",
            )
        )

    legend_x = -year_spacing * 0.8

    all_annotations.append(
        dict(
            x=legend_x,
            y=total_squares * (square_size + gap) - 2,
            xref="x",
            yref="y",
            text="\u2642 Male",
            showarrow=False,
            font=dict(size=12, color=gender_colors["M"], family=FONT_CONFIG["family"]),
            xanchor="left",
        )
    )

    all_annotations.append(
        dict(
            x=legend_x,
            y=total_squares * (square_size + gap) - 3.5,
            xref="x",
            yref="y",
            text="\u2640 Female",
            showarrow=False,
            font=dict(size=12, color=gender_colors["F"], family=FONT_CONFIG["family"]),
            xanchor="left",
        )
    )

    layout = get_base_layout()
    layout.update(
        {
            "title": {
                "text": "<b>The Decline of Name Conformity</b><br>"
                + "<sub>Out of 20 babies born in each year, this many would share the #1 most popular name</sub>",
                "font": {
                    "size": FONT_CONFIG["title_size"],
                    "color": FONT_CONFIG["color"],
                },
                "x": 0.5,
                "xanchor": "center",
            },
            "xaxis": {
                "visible": False,
                "showgrid": False,
                "showticklabels": False,
                "range": [
                    -year_spacing,
                    (len(selected_years) - 1) * year_spacing + year_spacing,
                ],
            },
            "yaxis": {
                "visible": False,
                "showgrid": False,
                "showticklabels": False,
                "range": [-3, total_squares * (square_size + gap) + 1],
            },
            "plot_bgcolor": "white",
            "paper_bgcolor": "rgba(0,0,0,0)",
            "showlegend": False,
            "height": 600,
            "width": 1000,
            "font": {
                "family": FONT_CONFIG["family"],
                "color": FONT_CONFIG["color"],
            },
            "annotations": all_annotations,
        }
    )

    fig.update_layout(layout)

    save_chart_json(
        fig,
        "name_concentration_waffle.json",
        desktop_title="<b>The Decline of Name Conformity</b><br>"
        + "<sub>Out of 20 babies born in each year, this many would share the #1 most popular name</sub>",
        mobile_title="<b>The Decline of<br>Name Conformity</b>",
    )

    return fig


if __name__ == "__main__":
    print("Creating Baby Names Visualizations...")
    print(f"Using color palette: {COLOR_PALETTE}")
    print("-" * 80)

    print("\n1. Creating unique names scatter plot...")
    create_unique_names_scatter()

    print("\n2. Creating name concentration waffle charts...")
    create_name_concentration_waffle()

    print("\n" + "=" * 80)
    print("All visualizations created successfully!")
    print(f"JSON files saved in: {BUNDLED_DIR}")
    print("=" * 80)
