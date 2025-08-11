use wasm_bindgen::prelude::*;

// This is the function that JavaScript will call
#[wasm_bindgen]
pub fn calculate(expression: &str) -> Result<String, JsValue> {
    match meval::eval_str(expression) {
        Ok(result) => {
            // Successfully calculated, return the result as a string
            Ok(result.to_string())
        }
        Err(err) => {
            // An error occurred, convert it to a JavaScript error
            Err(JsValue::from_str(&err.to_string()))
        }
    }
}