const copy = require('copy');

copy('index.html', '../docs', { cwd: 'src/' });
copy('static/**/*', '../docs', { cwd: 'src/' });
