//
//  zipViewController.swift
//  Whaddaya Wanna Eat?
//
//  Orion Schyberg, 11/23/21.
//

import UIKit

class zipViewController: UIViewController, UITextFieldDelegate {
    // Restaurant structure
    struct Restaurant:Codable {
        var name: String!
        var address: String!
        var photoURL: String!
        var price: String!
        var rating: Double!
    }
    
    // Buttons
    @IBOutlet weak var searchBar: UITextField!
    @IBOutlet weak var styleBar: UITextField!
    @IBOutlet weak var search: UIButton!
    @IBOutlet weak var backBTN: UIButton!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Pleasing to the eyes of all
        searchBar.layer.cornerRadius = 4
        searchBar.clipsToBounds = true
        styleBar.layer.cornerRadius = 4
        styleBar.clipsToBounds = true
        search.layer.cornerRadius = 10
        search.layer.masksToBounds = true
        backBTN.layer.cornerRadius = 10
        backBTN.layer.masksToBounds = true
        
        searchBar.keyboardType = .numberPad
        
        //sophie added this for keyboard dismissing purposes
        searchBar.delegate = self
        styleBar.delegate = self
    }
    
    static var restList: [Restaurant] = [Restaurant]()
    
    // Button press
   
    @IBAction func searchBTN(_ sender: Any) {
        //sophie added this for keyboard dismissing purposes
        hideKeyboard()
        var retVal = ""
        if (self.searchBar.text != "") {
            
            let range = NSRange(location: 0, length: self.searchBar.text!.utf16.count)
            let regex = try! NSRegularExpression (pattern: "^[0-9]{5}$")
            if (regex.firstMatch(in: self.searchBar.text!, options: [], range: range) == nil) {
                let alert = UIAlertController(title: "", message: "Please enter a valid United ZIP code!", preferredStyle: .alert)
                let closeAction = UIAlertAction(title: "Close", style:UIAlertAction.Style.cancel, handler:{action in print("Close")})
                alert.addAction(closeAction)
                self.present(alert, animated: true, completion: nil)
            }
            else {
                fetchRestaurants (completion: { String in
                    retVal = String
                })

                while (retVal == "") {}
                if (retVal.contains("OK")) {
                    zipViewController.restList = parseJson(jsonData: retVal)
                    print (zipViewController.restList)
                    let story = UIStoryboard(name: "Main", bundle: nil)
                    let controller = story.instantiateViewController(withIdentifier: "zipResultsViewController") as! zipResultsViewController
                    self.present(controller, animated: true, completion: nil)
                }
            }
        } else {
            let alert = UIAlertController(title: "", message: "Please enter at least a ZIP code!", preferredStyle: .alert)
            let closeAction = UIAlertAction(title: "Close", style:UIAlertAction.Style.cancel, handler:{action in print("Close")})
            alert.addAction(closeAction)
            self.present(alert, animated: true, completion: nil)
        }
    }
    
    // Maps API call.
    func fetchRestaurants (completion: @escaping (String) -> (Void)) {
        var URLString = "https://maps.googleapis.com/maps/api/place/textsearch/json?query="

        let snippedStyle = self.styleBar.text!.replacingOccurrences(of: " ", with: "%20", options: .literal, range: nil)
        
        URLString = URLString + snippedStyle + "%20restaurants%20" + self.searchBar.text! //+ APIkey removed for hacking purposes
        
        
        // Okay, let's do it
        let url = URL(string: URLString)
        guard let requestUrl = url else { fatalError() }
        let request = URLRequest(url: requestUrl)
        
        URLSession.shared.dataTask (with: request) {(data, response, error) in
            guard let data = data else { return }
            let returnedData: String! = String (data: data, encoding: .utf8)
            completion (returnedData)
        }.resume()
    }
    
    // Parses our data from the maps API request
    func parseJson (jsonData: String!) -> [Restaurant] {
        var restList: [Restaurant] = [Restaurant]()
        var currRestaurant: Restaurant = Restaurant()
        var count: Int! = 0
        var restCount: Int! = 0
        let str = jsonData.split(separator: "\"")
        
        while (str[count] != "status" && str[count+1] != ":") {
            while (str[count] != "business_status" && str[count] != "status") { count += 1; }
            if (str[count] != "status" && str[count+2] != "OPERATIONAL") { count += 1; }
            else if (str[count] != "status") {
                count += 6
                currRestaurant.address = "" + str[count]
                while (str[count] != "name" && str[count+1] != ":") { count += 1 }
                count += 2
                currRestaurant.name = "" + str[count]
                while (str[count] != "status" && str[count] != "price_level") { count += 1}
                count += 1
                currRestaurant.price = "" + str[count].replacingOccurrences(of: ",", with: "").replacingOccurrences(of: "\n", with: "").replacingOccurrences(of: ":", with: "").replacingOccurrences(of: " ", with: "")
                while (str[count] != "status" && str[count] != "rating") { count += 1 }
                count += 1
                currRestaurant.rating = Double(str[count].replacingOccurrences(of: ",", with: "").replacingOccurrences(of: "\n", with: "").replacingOccurrences(of: ":", with: "").replacingOccurrences(of: " ", with: ""))
                // Finally we increment Restaurant Count
                restList.append(currRestaurant)
                restCount += 1
            }
        }
        print (restCount!)
        return restList
    }
    
    //sophie added this for keyboard dismissing purposes
    func hideKeyboard(){
        searchBar.resignFirstResponder()
        styleBar.resignFirstResponder()
    }
    
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        hideKeyboard()
        return true
    }
}
