export const FEATURE_GROUPS = [
  {
    id: 'mean',
    label: 'Mean Values',
    description: 'Average measurements from cell nuclei',
    color: 'teal',
    fields: [
      { key: 'radius_mean', label: 'Radius Mean', placeholder: 'e.g. 14.13', step: 0.001 },
      { key: 'texture_mean', label: 'Texture Mean', placeholder: 'e.g. 19.29', step: 0.001 },
      { key: 'perimeter_mean', label: 'Perimeter Mean', placeholder: 'e.g. 91.97', step: 0.01 },
      { key: 'area_mean', label: 'Area Mean', placeholder: 'e.g. 654.89', step: 0.1 },
      { key: 'smoothness_mean', label: 'Smoothness Mean', placeholder: 'e.g. 0.0964', step: 0.0001 },
      { key: 'compactness_mean', label: 'Compactness Mean', placeholder: 'e.g. 0.1043', step: 0.0001 },
      { key: 'concavity_mean', label: 'Concavity Mean', placeholder: 'e.g. 0.0888', step: 0.0001 },
      { key: 'concave_points_mean', label: 'Concave Points Mean', placeholder: 'e.g. 0.0489', step: 0.0001 },
      { key: 'symmetry_mean', label: 'Symmetry Mean', placeholder: 'e.g. 0.1812', step: 0.0001 },
      { key: 'fractal_dimension_mean', label: 'Fractal Dimension Mean', placeholder: 'e.g. 0.0628', step: 0.0001 },
    ],
  },
  {
    id: 'se',
    label: 'Standard Error',
    description: 'Measurement error across cell nuclei',
    color: 'blue',
    fields: [
      { key: 'radius_se', label: 'Radius SE', placeholder: 'e.g. 0.405', step: 0.001 },
      { key: 'texture_se', label: 'Texture SE', placeholder: 'e.g. 1.217', step: 0.001 },
      { key: 'perimeter_se', label: 'Perimeter SE', placeholder: 'e.g. 2.866', step: 0.001 },
      { key: 'area_se', label: 'Area SE', placeholder: 'e.g. 40.34', step: 0.01 },
      { key: 'smoothness_se', label: 'Smoothness SE', placeholder: 'e.g. 0.007041', step: 0.000001 },
      { key: 'compactness_se', label: 'Compactness SE', placeholder: 'e.g. 0.02548', step: 0.00001 },
      { key: 'concavity_se', label: 'Concavity SE', placeholder: 'e.g. 0.03189', step: 0.00001 },
      { key: 'concave_points_se', label: 'Concave Points SE', placeholder: 'e.g. 0.01180', step: 0.00001 },
      { key: 'symmetry_se', label: 'Symmetry SE', placeholder: 'e.g. 0.02054', step: 0.00001 },
      { key: 'fractal_dimension_se', label: 'Fractal Dimension SE', placeholder: 'e.g. 0.003795', step: 0.000001 },
    ],
  },
  {
    id: 'worst',
    label: 'Worst Values',
    description: 'Largest (most severe) measurements',
    color: 'rose',
    fields: [
      { key: 'radius_worst', label: 'Radius Worst', placeholder: 'e.g. 16.27', step: 0.001 },
      { key: 'texture_worst', label: 'Texture Worst', placeholder: 'e.g. 25.68', step: 0.001 },
      { key: 'perimeter_worst', label: 'Perimeter Worst', placeholder: 'e.g. 107.26', step: 0.01 },
      { key: 'area_worst', label: 'Area Worst', placeholder: 'e.g. 880.58', step: 0.1 },
      { key: 'smoothness_worst', label: 'Smoothness Worst', placeholder: 'e.g. 0.1324', step: 0.0001 },
      { key: 'compactness_worst', label: 'Compactness Worst', placeholder: 'e.g. 0.2543', step: 0.0001 },
      { key: 'concavity_worst', label: 'Concavity Worst', placeholder: 'e.g. 0.2722', step: 0.0001 },
      { key: 'concave_points_worst', label: 'Concave Points Worst', placeholder: 'e.g. 0.1146', step: 0.0001 },
      { key: 'symmetry_worst', label: 'Symmetry Worst', placeholder: 'e.g. 0.2901', step: 0.0001 },
      { key: 'fractal_dimension_worst', label: 'Fractal Dimension Worst', placeholder: 'e.g. 0.0839', step: 0.0001 },
    ],
  },
]

export const ALL_FEATURE_KEYS = FEATURE_GROUPS.flatMap((g) => g.fields.map((f) => f.key))

export const EMPTY_FORM = Object.fromEntries(
  ALL_FEATURE_KEYS.map((k) => [k, ''])
)
