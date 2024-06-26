# Prompt engineering

Prompt engineering is the practice of giving an AI model specific instructions to produce the results you want.

## Best Practices For Prompt Crafting With GitHub Copilot

- **Iterate on and recraft your prompts**: If your initial prompt doesn't give you what you want, delete the generated code suggestion, edit your comment or prompt with more details, or, by saying it another way, with more details and examples, and then try again. By providing a big picture description within your prompt for a section of code or a new file that is completely blank**, this big picture description to set the stage will help GitHub Copilot provide better results. Also, when you're crafting your prompts, keep them simple and specific to the point with the right amount of description. Providing a series of clear steps to define what we want. I think of this as more like a recipe with a list of separate ingredients or steps that we're sending to GitHub Copilot instead of a long paragraph that includes everything. 

- **The second tip or best practice is to keep a couple of relevant tabs open in your editor**: now GitHub Copilot uses a technique called neighboring tabs that allows the AI pair programmer to contextualize your code by processing all of the files open in your IDE instead of just the single file that you're working on. By opening all files relevant to your project, GitHub Copilot will automatically comb through all of the data and find matching pieces of code between your open files and the code around your cursor and then add those matches to the prompt response if it's relevant. This allows you to GitHub more complete response that provides code suggestions and explanations of code that not only are applied to one file but multiple files within the same prompt response.

- **Another tip or best practice is to provide GitHub Copilot examples within your prompts**: learning from examples is not only useful for humans, but also for generative AI tools like GitHub Copilot. So in addition to providing steps within your prompts, you can show GitHub Copilot what you want it to do with examples in your preferred coding style. While GitHub Copilot is using an AI model that is already trained on a large amount of data, providing examples to GitHub Copilot will help it understand the context and constraints of a particular code snippet. Now this concept of providing examples to AI models is actually a common practice in machine learning, and some popular approaches are called **zero‑shot learning**, **one‑shot learning**, and **few‑shot learning**. 
    - **Zero‑shot learning**: imagine you have a friend who loves animals but has never seen a zebra before. Now if you show your friend a picture of a zebra and ask what animal is this and your friend guesses it's a zebra without any prior information, that's like zero‑shot learning. It's making a correct guess about something without any training or examples beforehand. 
    
    - **One‑shot learning**: now say your friend has seen a few pictures of zebras before but not many. If you show a new picture of a zebra and your friend can correctly say it's a zebra based on just that one additional picture, it's like one‑shot learning. It's learning from a very small amount of information. Now, with few‑shot learning, if your friend has seen a bunch of pictures of different animals including zebras and you show a new zebra picture, they can still recognize it even though they haven't seen many zebras before. It's learning from a small but still more than one set of examples. So in summary, **zero‑shot is like making a good guess about something completely new, one‑shot is learning from just one example, and few‑shot is learning from a small group of examples but more than one.**

## LLMs and OpenAIs Codex That Powers GitHub Copilot

LLMs refer to a type of artificial intelligence model that is trained on massive amounts of text data to understand and generate human-like language. These models use machine learning techniques, particularly deep learning, to process and analyze language patterns, enabling them to perform various natural language processing taks.

# The Data Flow Behind GitHub Copilot

## Inbound Data Flow

This data flow of GitHub Copilot includes the OpenAI model that does a lot of the heavy lifting or the magic behind the scenes. But there are several steps that occur before the prompt or request that gets to the model and several steps that occur once the model has adapted the input request before the user sees the output response. This data flow can be separated into two main parts, the **inbound data flow** and the **outbound data flow**.

Let's start with the inbound data flow. The data flow starts with your code editor or your IDE. Because GitHub Copilot is based on the use of a plugin within your code editor, GitHub Copilot is scoped to your local environment within that code editor. It doesn't look at your Git repositories, your other file systems, or any open browsers that you may have opened. However, once you initiate a prompt or request with GitHub Copilot, if you have open files within your code editor, GitHub Copilot does look at those open files for context to better understand your code to provide you more accurate suggestions. 

Once a prompt is sent from the code editor, GitHub Copilot will first look at the main open file and notice where your cursor is positioned within that file. Copilot will then pull a window of roughly 400 characters before and after your cursor. It will evaluate the code within that window and then will look at any open tabs within your code editor to see if there's anything useful that it can reference to give a better prompt suggestion. A common example of this is writing unit tests. If you're writing unit tests in one file and the file you're testing is in an adjacent tab, GitHub Copilot will evaluate the initial code in the main file around your cursor, look at the code in the adjacent tab for additional context, and then use all of that information to provide you a better prompt suggestion. 

At this point, all of this data that is being curated together then gets bundled up and sent over to a proxy server or a proxy service. This proxy server is basically a computer that sits between your device, your code editor, and the OpenAI model. It's important to note that all of this data is encrypted before it is sent over to the proxy service. The prompt is sent over HTTPS using TLS 1.2 or 1.3, which is the same secure method if you were to make a purchase online, use VPN protocols, secure file transfers, and other common forms to secure data transfers. In short, it's secure, encrypted, and considered a highly secured cryptographic protocol for securing communication over the internet. 

Once the data is encrypted, it's sent over to this Copilot proxy server. The proxy service is run in a GitHub‑owned Azure tenant. GitHub controls this proxy service and sets the specifications on how it runs the pre and post processing of the code that goes through the proxy service. On the preprocessing side, once the prompt has been encrypted and has been received by the proxy, the proxy service will decrypt the data, keep it in RAM for processing, and filter the data for a few things. One filter that it does is perform a scrub of information that is considered personally identifiable information or PII data. This can include things like IP addresses, email addresses, or even certain GitHub URLs. Now this kind of data will be scrubbed from the prompt request before it moves on to the model. Another thing that happens in this proxy service is what's called a toxicity filter. GitHub Copilot runs through Microsoft's responsible AI toxicity filter and will remove things like hate speech, profanity, and even request to intentionally abuse the model. Anything that falls into this category will simply be removed from the request. If it finds PII data, it gets stripped out. If it finds something toxic, offensive, or abusive, Copilot just ignores it. In addition to the filtering that takes place, the proxy service also runs a code classifier based on the prompt data. So for example, is it code that the user wants back? If it is, what kind? Are the files in Java, Python, or something else? All of this information is what the proxy service is doing on the front end. 

Once this preprocessing is done, it remains in RAM and nothing is ever stored at rest. It then gets re encrypted and sent to the model. Once the data is sent to the OpenAI model specific for GitHub Copilot, the quality of suggestions you receive may depend on the volume and diversity of the training data for that language. You can think of this model as performing applied statistics instead of just copying and pasting code as a prompt suggestion. The model is taking everything that was passed from the proxy service and essentially breaking it down into small bits of information called tokens. So for example, if you were to take a sentence, pretend that each word is a token and the model is mapping each token's proximity to every other token that it sees and using that data to provide the response. Let's look at an example using Java. If the prompt starts with `public`, most of the time the next word is going to be `class`. Now, statistically, if you have a `public class`, most of the time the next thing is going to be a variable name, defining that class. Using another Java example, if the prompt reads `public static`, most of the time you know that the next thing is going to be `void main` because that is the typical language for a Java main method and is what you would expect to see as the return prompt suggestion. So in general, the model is looking at the prompt that was provided and then evaluating the statistically most likely prompt response back to the user based on the series of tokens that it was given. 

As this model receives more training, the responses become more accurate and the model can better predict your desired outcome. So that's essentially what this model is doing. It gets this encrypted prompt from the proxy service that's gone through this preprocessing scrub, decrypting it, and running its token analysis before returning the prompt response back to the proxy service. **That is the inbound data flow**.

![Dataflow do para inbound data](img\inboundDataFlow.png)

## Outbond Data Flow

We're now looking at the outbound data flow where everything goes back in the other direction. Once the model is done generating the list of suggestions, it returns those suggestions to the same proxy service as before. Within this same proxy service, the suggestions generated from the model are put through the same filters as the inbound data. The suggestions go through the same toxicity filter to remove things like hate speech or profanity from the suggestions. They also go through an identity filter for PII data. So again, that's any information like email addresses, IP addresses, or any hardcoded credentials. They also go through a code quality filter that checks for common security vulnerabilities within the generated suggestions, as well as the obvious incorrect suggestions. Another filter the data is passed through is an intent classifier. This filter makes sure that the generated suggestions are for a user actually writing code. And another filter that is optional when setting up GitHub Copilot is the duplicate detection filter. Now this filter looks at any generated suggestion that exceeds about 150 characters that matches any open source code that is publicly available on GitHub. If you have this filter enabled, GitHub Copilot will not provide that suggestion if it finds a public match. And lastly, any suggestions that survive this rigorous journey are encrypted and sent back over to the code editor for the user to see. 

So in summary, the data flow starts with the developer's code editor. Copilot looks for context to see what the developer is working on. It does this by looking at a few lines before and after the cursor, as well as any adjacent files open in the editor to better understand the intent of the developer. Once Copilot assembles enough context, the context is packaged into a prompt that flows to the proxy server. This is basically a computer that sits in between the user's device and the AI model. At this proxy server, the prompt runs through a toxicity filter, as well as an identifier filter. And once the prompt clears those filters, it goes to the AI model where suggestions are then generated. The suggestions then start the return back to the proxy server where they then go through a series of filters, a toxicity filter, identifier filter, a code quality filter, and intent classifier filter, and, if enabled, a duplicate detection filter. 

At this point, any suggestions that survive are shown to the developer in their code editor. And with the generated suggestions, if you're using GitHub Copilot Business or Enterprise, the prompt is discarded and becomes part of garbage collection, and GitHub doesn't store it. If you're using GitHub Copilot individual, you can choose whether or not you want to share your prompts with GitHub Copilot. So when garbage collection comes along, once the suggestions array is transmitted to the developer's code editor, the suggestions then get deleted during garbage collection and are deleted from memory.

So all of this is happening like a constant stream of data, and it's occurring in less than a blink of an eye. A prompt gets initiated, it goes through the model and suggestions are generated. Then suggestions come back and are sent to the user's code editor and are then deleted. 

![Dataflow do para outbond data](img\outboundDataFlow.png)

---
---
---

# Helping GithHub Copilot help you

**Context**

Additional information to help GitHub Copilot generate custom suggestions.

**Intent**

The specific goal you have in mind when creating the prompt.

**Clarity**

How easy something is to understand.

**Specificity**

The level of detail about the task you wish to complete.

# Comment driven development | Best practices using GitHubCopilot

**Describe the goal**

Start a file with a few lines of comments highlighting what you´re building.

**Be flexible**

If you don´t see what you want, rephrase the question.

**Provide Examples**
If you´re processing data, show the start and end points you expect.

# Good code begets good code

**Name things properly**

Poorly named variables and functions don´t provide context.

**Follow best practices**

Suggestions will follow the example you set in your code.

**Open relevant files**

When building with custom frameworks, open representative examples.