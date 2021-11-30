//
//  changeNameViewController.swift
//  Whaddaya Wanna Eat?
//
//  Created by Sophia Guelfi on 10/25/21.
//

import UIKit

class changeNameViewController: UIViewController, UITextFieldDelegate {

    //outlets for textfields and buttons
    @IBOutlet weak var fName: UITextField!
    @IBOutlet weak var lName: UITextField!
    @IBOutlet weak var submit: UIButton!
    @IBOutlet weak var back: UIButton!
    
    //global variables
    static var updatedFName = ""
    static var updatedLName = ""

    override func viewDidLoad() {
        super.viewDidLoad()
        //rounded buttons and textfields
        fName.layer.cornerRadius = 4
        fName.clipsToBounds = true
        lName.layer.cornerRadius = 4
        lName.clipsToBounds = true
        submit.layer.cornerRadius = 10
        submit.layer.masksToBounds = true
        back.layer.cornerRadius = 10
        back.layer.masksToBounds = true
        
        //displays the users first and last name
        self.fName.text = profileViewController.fullFName.capitalized
        self.lName.text = profileViewController.fullLName.capitalized
        
        //for keyboard dismissing purposes
        fName.delegate = self
        lName.delegate = self
                
    }
    
    @IBAction func changeName(_ sender: Any) {
        //for keyboard dismissing purposes
        hideKeyboard()
        
        var retVal = ""
        if(fName.text! != "" && lName.text! != ""){
            if(fName.text!.count < 3){
                
                let alert = UIAlertController(title: "", message: "First name must be longer then 3 letters!", preferredStyle: .alert)
                let closeAction = UIAlertAction(title: "Close", style:UIAlertAction.Style.cancel, handler:{action in print("Close")})
                alert.addAction(closeAction)
                self.present(alert, animated: true, completion: nil)
                
            }else if(lName.text!.count < 3){
                
                let alert = UIAlertController(title: "", message: "Last name must be longer then 3 letters!", preferredStyle: .alert)
                let closeAction = UIAlertAction(title: "Close", style:UIAlertAction.Style.cancel, handler:{action in print("Close")})
                alert.addAction(closeAction)
                self.present(alert, animated: true, completion: nil)
                
            }else{
                fetchChangeNameData(completion: {String in
                    retVal = String
                    
                })
                while(retVal == ""){}
                print("Returned Info: \(retVal)")
                
                var fHalf = ""
                if let range = retVal.range(of: "first_name"){
                        let firstN = retVal[range.upperBound...]
                        fHalf = String((firstN.dropFirst(3)))
                }
                
                if let range = fHalf.range(of:"last_name"){
                    let fName = fHalf[..<range.lowerBound]
                    changeNameViewController.updatedFName = String(fName.dropLast(3))
                }
                
                
                var lHalf = ""
                if let range = retVal.range(of: "last_name"){
                    let firstL = retVal[range.upperBound...]
                    lHalf = String((firstL.dropFirst(3)))
                }
                
                if let range = lHalf.range(of: "email"){
                    let lName = lHalf[..<range.lowerBound]
                    changeNameViewController.updatedLName = String(lName.dropLast(3))
                }
                
                if(retVal.contains("success")){
                    while(retVal == ""){}
                        print("very successful")
                    print("HI again: \(retVal)")
                }
            }
        }else{
            let alert = UIAlertController(title: "", message: "Please enter all fields!", preferredStyle: .alert)
            let closeAction = UIAlertAction(title: "Close", style:UIAlertAction.Style.cancel, handler:{action in print("Close")})
            alert.addAction(closeAction)
            self.present(alert, animated: true, completion: nil)
        }
    }
    
    func fetchChangeNameData(completion: @escaping(String) -> (Void)){
        let url = URL(string: "https://waddaya-wanna-eat.herokuapp.com/api/users/edit")
        guard let requestUrl = url else{fatalError()}
        
        var request = URLRequest(url: requestUrl)
        request.httpMethod = "PATCH"
        request.setValue("Bearer \(profileViewController.tTokens)", forHTTPHeaderField: "Authorization")
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        
        let patchString = createChangeNameJSON(first_name: fName.text!, last_name: lName.text!)
        
        request.httpBody = patchString!.data(using: String.Encoding.utf8)
        
        URLSession.shared.dataTask(with: request){ data, response, error in
            if let data = data, let returnedData = String(data: data, encoding: .utf8){
                print("HTTP RESPonse: \n\(returnedData)")
                completion(returnedData)
            }
        }.resume()
    }
    
    //for keyboard dismissing purposes
    func hideKeyboard(){
        fName.resignFirstResponder()
        lName.resignFirstResponder()
    }
    
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        hideKeyboard()
        return true
    }
    

}
