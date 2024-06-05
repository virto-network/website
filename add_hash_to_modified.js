const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Seleccionamos directorias a monitorear por cambios
const rootDir = process.cwd();
const cssDir = path.join(rootDir, 'css');
const templatesDir = path.join(rootDir, '_data');

// Seleccionamos las extensiones de archivos a modificar
const extensionsToMonitor = ['.css', '.liquid'];

function calculateFileHash(filePath) {
    const fileBuffer = fs.readFileSync(filePath);
    const hashSum = crypto.createHash('md5');
    hashSum.update(fileBuffer);
    return hashSum.digest('hex');
}


function renameFileWithHashIfModified(filePath) {
    const fileExt = path.extname(filePath);
    const fileName = path.basename(filePath, fileExt);
    const dirName = path.dirname(filePath);

    if (extensionsToMonitor.includes(fileExt)) {
        const newHash = calculateFileHash(filePath);
        const newFileName = `${fileName}.${newHash}${fileExt}`;
        const newFilePath = path.join(dirName, newFileName);

        if (filePath !== newFilePath) {
            fs.rename(filePath, newFilePath, (err) => {
              if (err) throw err;
              console.log(`Renamed ${filePath} to ${newFilePath}`);
            });
          }
    }
}

// Función para monitorear cambios en archivos en un directorio
function watchDirectory(dir) {
    fs.watch(dir, { recursive: true }, (eventType, filename) => {
        if (filename) {
            const filePath = path.join(dir, filename);
            if (fs.existsSync(filePath)) {
                renameFileWithHashIfModified(filePath);
            }
        }
    });
}

// Monitorear los directorios css y templates
watchDirectory(cssDir);
watchDirectory(templatesDir);

console.log('Watching for file changes in css and templates directories...');