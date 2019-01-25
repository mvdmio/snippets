# Update .gitignore file

When updating the .gitignore you often have files committed that should now be ignored.
To remove these files from git, you can run the following commands in order:
1. `git rm -r --cached .`
2. `git add .`
3. `git commit -m "updated .gitignore"`
4. `git push`

Do make sure you don't have any other files changed other than the .gitignore file, or you'll risk losing them.
You can commit these files before running the above commands to save your work.