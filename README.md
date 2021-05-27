# GradeScript
Parses markdown files with metadata into html for grading students

# Usage
gradescript <files..>  
It automatically parse all the `.gmd` files passed to the program and recursively searches directories into html files.
The output is the original filename + `.html`

# The `.gmd` files
The `.gmd` files are just normal markdown files with a little bit of metadata added to the top.
The metadata is seperated by `===` so this is not valid markdown for the `.gmd` files.

Valid metadata keys are:
| Key | Value |
|-|-|
| corrector | The name of the corrector |
| criteria | The path to the criteria file (relative to the .gmd file) |
| points | A JSON array of points (The amount of points must be atleast the same size as the amount criterias) |
| student | The name of the student that is graded |
| style (optional) | The path to the stylesheet (relative to the .gmd file) |
| template (optional) | The path to the PUG template (relative to the .gmd file) |

# Examples
An example `.gmd` file
```markdown
corrector: Robin Eschbach
student: Robin Eschbach
points: [1, 2, 3, 4]
criteria: criteria.json
===
# Commentary
You should comment your code more. Please do it... It will help make you **feel better**
```

An example `criteria` file for that would be
```json
{
  "Comments": 5,
  "Formatting": 5,
  "Input/Output": 5,
  "Program": 5
}
```
The value is the maximum amount of points that can be reached for this criteria
