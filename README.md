# chicken-reviewer


## Usage

### create Personal Access Token

- create Personal Access Token
- create OpenAI api key
- reg repository secret



``` markdown
jobs:
  reviewer:
    runs-on: ubuntu-latest
    steps:
      - name: reviewer run
        uses: birariro/chicken-code-review@1.0.0
        with:
          github-token: '<GitHub WebHook Secret Token>'
          gpt-key: '<Chat-GPT api key>'
```


[create secret token with reg]("https://docs.github.com/en/actions/security-guides/encrypted-secrets") </br>
[create open ai key]("https://platform.openai.com/account/api-keys")


