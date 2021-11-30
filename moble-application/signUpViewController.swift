//
//  signUpViewController.swift
//  Whaddaya Wanna Eat?
//
//  Created by Sophia Guelfi on 10/25/21.
//

import UIKit

class signUpViewController: UIViewController, UITextFieldDelegate{

   //outlets
    @IBOutlet weak var usernameSignUP: UITextField!
    @IBOutlet weak var fNameSignUP: UITextField!
    @IBOutlet weak var lNameSignUP: UITextField!
    @IBOutlet weak var emailSignUP: UITextField!
    @IBOutlet weak var passSignUP: UITextField!
    @IBOutlet weak var cPassSignUP: UITextField!
    @IBOutlet weak var pNum: UITextField!
    @IBOutlet weak var signUpBtn: UIButton!
    @IBOutlet weak var backBTN: UIButton!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        //rounded buttons and text fields
        fNameSignUP.layer.cornerRadius = 4
        fNameSignUP.clipsToBounds = true
        lNameSignUP.layer.cornerRadius = 4
        lNameSignUP.clipsToBounds = true
        emailSignUP.layer.cornerRadius = 4
        emailSignUP.clipsToBounds = true
        passSignUP.layer.cornerRadius = 4
        passSignUP.clipsToBounds = true
        cPassSignUP.layer.cornerRadius = 4
        cPassSignUP.clipsToBounds = true
        pNum.layer.cornerRadius = 4
        pNum.clipsToBounds = true
        usernameSignUP.layer.cornerRadius = 4
        usernameSignUP.clipsToBounds = true
        signUpBtn.layer.cornerRadius = 10
        signUpBtn.layer.masksToBounds = true
        backBTN.layer.cornerRadius = 10
        backBTN.layer.masksToBounds = true
        
        
        //for keyboard dismissing purposes
        usernameSignUP.delegate = self
        fNameSignUP.delegate = self
        lNameSignUP.delegate = self
        emailSignUP.delegate = self
        passSignUP.delegate = self
        cPassSignUP.delegate = self
        pNum.delegate = self
        
        //makes the phoneNumber textField have a numberPad
        pNum.keyboardType = .numberPad

        
    }
    @IBAction func signupb(_ sender: Any) {
        //for keyboard dismissing purposes
        hideKeyboard()
        
        var retVal = ""
        if(fNameSignUP.text! != "" && lNameSignUP.text! != "" && emailSignUP.text! != "" && passSignUP.text! != "" && cPassSignUP.text! != "" && pNum.text! != "" && usernameSignUP.text! != ""){
            if (passSignUP.text! != cPassSignUP.text) {
                
                let alert = UIAlertController(title: "", message: "Passwords do not match!", preferredStyle: .alert)
                let closeAction = UIAlertAction(title: "Close", style:UIAlertAction.Style.cancel, handler:{action in print("Close")})
                alert.addAction(closeAction)
                self.present(alert, animated: true, completion: nil)
                
            }else if(pNum.text!.count != 10){
                
                let alert = UIAlertController(title: "", message: "Phone Number must be 10 digits!", preferredStyle: .alert)
                let closeAction = UIAlertAction(title: "Close", style:UIAlertAction.Style.cancel, handler:{action in print("Close")})
                alert.addAction(closeAction)
                self.present(alert, animated: true, completion: nil)
                
            }else if(fNameSignUP.text!.count < 3){
                
                let alert = UIAlertController(title: "", message: "First name must be longer then 3 letters!", preferredStyle: .alert)
                let closeAction = UIAlertAction(title: "Close", style:UIAlertAction.Style.cancel, handler:{action in print("Close")})
                alert.addAction(closeAction)
                self.present(alert, animated: true, completion: nil)
                
            }else if(lNameSignUP.text!.count < 3){
                
                let alert = UIAlertController(title: "", message: "Last name must be longer then 3 letters!", preferredStyle: .alert)
                let closeAction = UIAlertAction(title: "Close", style:UIAlertAction.Style.cancel, handler:{action in print("Close")})
                alert.addAction(closeAction)
                self.present(alert, animated: true, completion: nil)
                
            }else if(!emailSignUP.text!.contains("@") && !emailSignUP.text!.contains(".")){
                
                let alert = UIAlertController(title: "", message: "Email format not correct!", preferredStyle: .alert)
                let closeAction = UIAlertAction(title: "Close", style:UIAlertAction.Style.cancel, handler:{action in print("Close")})
                alert.addAction(closeAction)
                self.present(alert, animated: true, completion: nil)
                
            }else if(usernameSignUP.text!.count < 3){
                
                let alert = UIAlertController(title: "", message: "Username must be longer then 3 characters!", preferredStyle: .alert)
                let closeAction = UIAlertAction(title: "Close", style:UIAlertAction.Style.cancel, handler:{action in print("Close")})
                alert.addAction(closeAction)
                self.present(alert, animated: true, completion: nil)
                
            }else if(passSignUP.text!.count < 5){
                let alert = UIAlertController(title: "", message: "Password must be longer then 5 characters!", preferredStyle: .alert)
                let closeAction = UIAlertAction(title: "Close", style:UIAlertAction.Style.cancel, handler:{action in print("Close")})
                alert.addAction(closeAction)
                self.present(alert, animated: true, completion: nil)
            }else{
                fetchSignUPData(completion: {String in
                    retVal = String
                })
                while(retVal == ""){}
                print("Returned Info: \(retVal)")
            
                if(retVal.contains("success")){
                    let story = UIStoryboard(name: "Main", bundle: nil)
                    let controller = story.instantiateViewController(withIdentifier: "ViewController") as! ViewController
                    self.present(controller, animated: true, completion: nil)
            }
            }
        }else {
            let alert = UIAlertController(title: "", message: "Please enter all fields!", preferredStyle: .alert)
            let closeAction = UIAlertAction(title: "Close", style:UIAlertAction.Style.cancel, handler:{action in print("Close")})
            alert.addAction(closeAction)
            self.present(alert, animated: true, completion: nil)
        }
    }

    func fetchSignUPData(completion: @escaping (String) -> (Void)){
       //put the api URL look at vid for example
        let url = URL(string: "https://waddaya-wanna-eat.herokuapp.com/api/users/register")
        guard let requestUrl = url else{fatalError() }
        
        var request = URLRequest(url:requestUrl)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        let postString = createSignJSON(first_name: fNameSignUP.text!, last_name: lNameSignUP.text!, email: emailSignUP.text!, phone_number: pNum.text!, password: passSignUP.text!, username: usernameSignUP.text!, req: "true")
        
        request.httpBody = postString!.data(using: String.Encoding.utf8)
        
        URLSession.shared.dataTask(with: request) { data, response, error in
            if let data = data, let returnedData = String(data: data, encoding: .utf8){
                completion(returnedData)
            }
        }.resume()
    }
    
    //for keyboard dismissing purposes
    func hideKeyboard(){
        fNameSignUP.resignFirstResponder()
        lNameSignUP.resignFirstResponder()
        emailSignUP.resignFirstResponder()
        pNum.resignFirstResponder()
        usernameSignUP.resignFirstResponder()
        passSignUP.resignFirstResponder()
        cPassSignUP.resignFirstResponder()
    }
    
    //UITextFieldDelegate for hiding keyboard
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        hideKeyboard()
        return true
    }
    
}
