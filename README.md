# md2multihtml

This tool converts a single big markdown document to seperate HTML files.
The document is split by first-level sections.
The program creates a navigation bar, displays the document structure as tree graph and takes care of inline links across the document sections.

See a detailed description in [description.md](description.md).

## Installation

This tool needs Node.js as runtime environment.
After having installed Node.js please run the local package installation inside the project folder:

```
npm install
```


## Usage

This will generate HTML files in the specified output folder (defaults to `html/`).
The output folder will be deleted (!) before.

```
./md2multihtml.js -d -i <inputfile>
```

### Arguments
* `-i <inputfile>`: process the markdown file `<inputfile>`
* `-o <outputdir>`: set the output directory to `<outputdir>`
* `--delete-outdir=true` or `-d`: delete **(!)** and recreate the whole output dir before processing. **BE CAREFUL WHEN USING THIS!**



## License
Code released under the [MIT license](https://opensource.org/licenses/MIT).