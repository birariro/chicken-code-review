# chicken-reviewer


When you make a ```pull request``` or ```push```, you'll receive a code review from chat-GPT.



## Usage
```.github/workflows/<workflow-name>.yml```  file in your GitHub repo and add the following code.
</br>

If you want to include a review in your ```pull request```, do the following

``` yml          
name: PR EVENT
on: [pull_request]

jobs:
  reviewer:
    runs-on: ubuntu-latest
    steps:
      - name: reviewer run
        uses: birariro/chicken-code-review@1.0.1
        with:
          github-token: ${{ secrets.GIT_TOKEN }}
          gpt-key: ${{secrets.GPT_KEY}}
          trigger: "PR"
          language: "EN"
```

If you want to include a review in your ```push```, do the following
``` yml          
name: PUSH EVENT
on: [psuh]

jobs:
  reviewer:
    runs-on: ubuntu-latest
    steps:
      - name: reviewer run
        uses: birariro/chicken-code-review@1.0.1
        with:
          github-token: ${{ secrets.GIT_TOKEN }}
          gpt-key: ${{secrets.GPT_KEY}}
          trigger: "PUSH"
          language: "KR"
```

### input
- github-token(Required) : Create a personal access token in GitHub and create a GitHub secret.
- gpt-key(Required) : Generate an OpenAI API key and create a GitHub secret.
- trigger : Specify what you want to review (default = pull request)
- language : Specify the language for the answer (default = EN)

[github personal access token](https://docs.github.com/en/enterprise-server@3.5/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens) </br>
[github secret](https://docs.github.com/en/actions/security-guides/encrypted-secrets) </br>
[open AI key](https://platform.openai.com/account/api-keys)



### Why chicken?

The phrase ```chicken instead of pheasant``` is a Korean proverb that says </br>
which refers to substituting something that is similar to something else when there is nothing suitable. </br>
</br>
In other words, if you don't have someone to review your code </br>
chat-GPT to review your code. </br>





