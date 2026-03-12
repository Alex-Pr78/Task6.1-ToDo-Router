Команды для git <====================>

1. git status
2. git add. - добавить файлы в stage
3. git commit -m 'создать комментарий к гиту'
4. git log - показывает подробную информацию
5. git log --oneline - краткая информяция
6. git push [rep_link] [branch_name] - добавить на гитхаб
7. git branch - ветка
8. git remote -v
9. git remote add origin [https://github.com/...] - привязать ссылку к репозиторию
10. git clone [Url] - склонировать с гитхаб
11. git config [config user.name / config user.email] - проверить user / email если нужно изменить то после команды в "новый email / user"


Доп. команды: <=====================>

1. git reset [file(название файла)] - удаляет файлы из временного хранилища stage
2. git diff - показывает какие строки изменились.
3. git reset --hard - возвращает (откатывается назад) все изменения в файлах и очищает git status.


Ветки [branch]: <=====================>

1. git branch [название ветки] - добавить ветку
2. git branch -d [название ветки] - локально удалить ветку
3. git checkout[название ветки] - переключится на [branchName] ветку
4. git checkout -b [название ветки] - добавить ветку и сразу переключится на [новую] ветку
5. git pull [origin] [branch] - забирает изменения из ветки github и добавляет их в локальную ветку на компе
6. git merge [название ветки] - слияние ветки master и secondary (пример: git merge secondary-branch)

Доп команды
1. Форматирование — Alt + Shift + F.
