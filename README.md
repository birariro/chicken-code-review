# chicken-reviewer

If you do a PR, you'll get a code review

## Usage
```.github/workflows/<workflow-name>.yml```  file in your GitHub repo and add the following code.

``` markdown          
name: PR EVENT
on: [pull_request]

jobs:
  reviewer:
    runs-on: ubuntu-latest
    steps:
      - name: reviewer run
        uses: birariro/chicken-code-review@1.0.0
        with:
          github-token: ${{ secrets.GIT_TOKEN }}
          gpt-key: ${{secrets.GPT_KEY}}
          trigger: "PR"
```

### input
- github-token(Required) : Create a personal access token in GitHub and create a GitHub secret.
- gpt-key(Required) : Generate an OpenAI API key and create a GitHub secret.
- trigger : default pull request event trigger but push event trigger is also possible

[github token with secret](https://docs.github.com/en/actions/security-guides/encrypted-secrets) </br>
[open AI key](https://platform.openai.com/account/api-keys)







