- Строгий режим
- Подключение необходимых файлов
- Специфичный код, необходимый для выполнения команды
- Интерфейс команды
- - имя команды
- - запуск и т.д.
- - Экспорт


команды

node src/service/service.js --generate 5
src/service/service.js --version
npm run server - to run server
node src/index.js - to run express


    GET /api/search?query= — возвращает результаты поиска. Поиск объявлений выполняется по наименованию. Объявление соответствует поиску в случае наличия хотя бы одного вхождения искомой фразы.

I need to write get method for search with Array.filter and return it 
then test everything manually


to test query
~~http://localhost:3000/search?query=hohohho~~
