//
//  changePassViewController.swift
//  Whaddaya Wanna Eat?
//
//  Created by Sophia Guelfi on 10/25/21.
//

import UIKit

class changePassViewController: UIViewController, UITextFieldDelegate {

    //outlets
    @IBOutlet weak var newPass: UITextField!
    @IBOutlet weak var confirmPass: UITextField!
    @IBOutlet weak var submitPass: UIButton!
    @IBOutlet weak var backBTN: UIButton!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        //rounded buttons and textfields
        newPass.layer.cornerRadius = 4
        newPass.clipsToBounds = true
        confirmPass.layer.cornerRadius = 4
        confirmPass.clipsToBounds = true
        submitPass.layer.cornerRadius = 10
        submitPass.layer.masksToBounds = true
        backBTN.layer.cornerRadius = 10
        backBTN.layer.masksToBounds = true
        
        //for keyboard dismissing purposes
        newPass.delegate = self
        confirmPass.delegate = self
    }
    
    @IBAction func changePassword(_ sender: Any) {
        //for keyboard dismissing purposes
        hideKeyboard()
        
        var retVal = ""
        if(newPass.text! != "" && confirmPass.text! != ""){
            if(newPass.text!.count < 5 || confirmPass.text!.count < 5){
                
                let alert = UIAlertController(title: "", message: "Password must be at least 5 characters!", preferredStyle: .alert)
                let closeAction = UIAlertAction(title: "Close", style:UIAlertAction.Style.cancel, handler:{action in print("Close")})
                alert.addAction(closeAction)
                self.present(alert, animated: true, completion: nil)
                
            }else if(newPass.text! != confirmPass.text!){
                
                let alert = UIAlertController(title: "", message: "Passwords do not match!", preferredStyle: .alert)
                let closeAction = UIAlertAction(title: "Close", style:UIAlertAction.Style.cancel, handler:{action in print("Close")})
                alert.addAction(closeAction)
                self.present(alert, animated: true, completion: nil)
                
            }else{
                fetchChangePassData(completion: {String in
                    retVal = String
                })
                while(retVal == ""){}
                print("Returned Info: \(retVal)")
                
                if(retVal.contains("success")){
                    print("muy successful")
                }
            }
        }else{
            let alert = UIAlertController(title: "", message: "Please enter all fields!", preferredStyle: .alert)
            let closeAction = UIAlertAction(title: "Close", style:UIAlertAction.Style.cancel, handler:{action in print("Close")})
            alert.addAction(closeAction)
            self.present(alert, animated: true, completion: nil)
        }
    }
    
    func fetchChangePassData(completion: @escaping (String) -> (Void)){
        var statusProfile = ""
        profileViewController.fetchProfileData(completion: {String in
            statusProfile = String
        })
        
        while(statusProfile == ""){}

        let ch = Character("\"")
        let uid = statusProfile.split(separator: ch)
        print("https://waddaya-wanna-eat.herokuapp.com/api/users/resetPassword/\(uid[9])")
        let url = URL(string: "https://waddaya-wanna-eat.herokuapp.com/api/users/resetPassword/\(uid[9])")
        guard let requestUrl = url else{fatalError()}
        
        var request = URLRequest(url: requestUrl)
        request.httpMethod = "PATCH"
        request.setValue("Bearer \(profileViewController.tTokens)", forHTTPHeaderField: "Authorization")
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        let postString = createChangePassJson(password: newPass.text!)
        
        request.httpBody = postString!.data(using: String.Encoding.utf8)
        
        URLSession.shared.dataTask(with: request) { data, response, error in
            if let data = data, let returnedData = String(data: data, encoding: .utf8){
                completion(returnedData)
            }
        }.resume()
        
    }
    
    //for keyboard dismissing purposes
    func hideKeyboard(){
        newPass.resignFirstResponder()
        confirmPass.resignFirstResponder()
    }
    
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        hideKeyboard()
        return true
    }
    

}
