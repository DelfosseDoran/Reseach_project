# User Guide - Installation Guide
Research Project

## Setting Up .env Files

### If there are no .env files in the project, follow these steps to create the .env files with the correct variables.

1. Create a file in the project's proxy server directory named `.env`.

2. Go to [axesso.developer.azure-api.net](https://axesso.developer.azure-api.net/) and create an account.

3. Next, visit the [Products page](https://axesso.developer.azure-api.net/products) and select one of the following.

4. Then, go to [Profile](https://axesso.developer.azure-api.net/profile) and click on 'Show' next to the Primary key. Copy this key and paste it into your `.env` file.

```dotenv
VITE_API_KEY='Your-key'
```
5. Go to the root of the project and also create a file named .env there.

6. Go to OpenAI Platform and log in or create an account.

7. Then, navigate to Billing Overview and create a plan.

8. Next, go to API Keys and create an API key. Copy this key and paste it into the .env file.

```dotenv
VITE_OPENAI_API_KEY='Your-key'
```
## Project Startup
### Follow these steps to start the project.

1. Open a terminal.

2. Navigate to the directory where the project is located on your computer.

3. Run this command to install all the required node_modules.

```cmd
npm i 
```

4. Run this command to start the project.

```cmd
npm run dev 
```

5. Open a second terminal.

6. Navigate to the directory where the project is located on your computer.

7. Navigate to the proxy server directory.

8. Run this command to install the required node_modules.

```cmd
npm i 
```

9. Run the command node proxy-server.js to establish communication between the project and the API.

## User Guide
Visit [local website](http://localhost:5173/) using Microsoft Edge.

Allow microphone access.

Ensure your audio is on and then use one of the following commands to interact with the webshop. The webshop can also be used like a regular online store.

### Various Commands
| Category              | Command Description                                               | Command Syntax                                       |
|-----------------------|------------------------------------------------------------------|------------------------------------------------------|
| **AI Commands**       | Ask a question to the AI                                           | `"Hey shop [question]"`                               |
|                       | Retrieve the difference between products (only on the products page) | `"Show the difference between product number [product index] and number [product index]"` |
| **Scroll Commands**   | Scroll down                                                       | `"Scroll down"`                                       |
|                       | Scroll up                                                         | `"Scroll up"`                                         |
|                       | Scroll to the top                                                 | `"Scroll to top"`                                     |
|                       | Scroll to the bottom                                              | `"Scroll to bottom"`                                  |
| **Navigation Commands**| Navigate back a page                                              | `"Go back"`                                           |
|                       | Go to the shopping cart page                                      | `"Navigate to shopping cart"`                         |
|                       | Go to the home page                                               | `"Navigate to home"`                                  |
| **Product Commands**  | Search for a product                                              | `"Search [product name]"`                             |
|                       | Display a product (only on the products and cart pages)         | `"Show product [product index]"`                      |
|                       | Add a product to the shopping cart (only on the product detail page) | `"Add product"`                                    |
|                       | Retrieve product variants (only on the product detail page)     | `"Variant [variant label] [variant value]"`          |
| **Shopping Cart Commands** | Remove a product (only on the checkout page)                 | `"Delete [product index]"`                            |
|                       | Go to the checkout page                                           | `"Checkout"`                                          |
| **Checkout Commands** | Fill in an input field (only on the checkout page)              | `"[input box name] [value]"`                          |
|                       | Select a payment method (only on the checkout page)            | `"Payment methods [payment method]"`                  |
|                       | Place an order (only on the checkout page)                      | `"Place order"`                                       |
