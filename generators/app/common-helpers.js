'use strict';

/**
 * This method is only used internally in copyTemplatedFiles().
 * It enables cleaning rendered template files by getting rid of empty comments,
 * resulting from templating markers used in the previous part of the copy process
 * @param contents
 * @returns {string}
 * @private
 */
const removeTemplatingMarkers = contents => {
    let file = contents.toString();
    let lines = file.split('\n');
    let linesToRemove = [];

    /*
     * First pass:
     * replacing inline empty comments with ''
     * and memorizing lines to remove
     */
    lines.forEach((el, i, array) => {
        if (el.trim() === '//') {
            linesToRemove.push(i);
        } else if (el.includes('/**/')) {
            array[i] = el.replace(/\/\*\*\//g, "");
        }
    });

    /*
     * Second pass:
     * recreating lines without '1-line' empty comments
     */
    let newLines = lines.filter((el, i) => {
        return linesToRemove.indexOf(i) === -1;
    });

    return newLines.join('\n');
};

/**
 * This method must be used internally in the "writing" phase of a generator.
 * It enables copying templated files in 2 steps:
 * 1) rendering EJS-style specific files for a generator into a temporary folder
 * 2) moving these files into their final destination, with removing
 * empty comments as remaining templating markers
 * @param filesToCopy
 * @returns {void}
 * @private
 */
const copyTemplatedFiles = function(filesToCopy) {
    for (let file of filesToCopy) {
        // First, render the templated files EJS-style
        this.fs.copyTpl(
            this.templatePath(file.name),
            this.destinationPath('pattern-buffer/' + file.name),
            file.replacements
        );

        /*
         * Secondly, transfer the files to their final destination
         * and get rid of empty comments/templating markers
         */
        this.fs.copy(
            this.destinationPath('pattern-buffer/' + file.name),
            this.destinationPath(file.name),
            {
                process: removeTemplatingMarkers
            }
        );

        this.fs.delete(this.destinationPath('pattern-buffer/' + file.name));
    }
};

module.exports = {
    copyTemplatedFiles: copyTemplatedFiles
};