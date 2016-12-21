# md2multihtml

This tool converts a single big markdown document to seperate HTML files.
The document is split by first-level sections.
The program creates a navigation bar, displays the document structure as tree graph and takes care of inline links across the document sections.

See a detailed description in [projectdescription.md](projectdescription.md).

## Usage

```
node multimd2html.js -o <outputdir> <inputfile>
```

It will generate HTML files in the specified output folder (defaults to `html/`).


## License
Code released under the [MIT license](https://opensource.org/licenses/MIT).