//
//  zipResultsViewController.swift
//  Whaddaya Wanna Eat?
//
//  Created by Sophia Guelfi on 11/23/21.
//

import UIKit

var count: Int! = 0
var max: Int! = zipViewController.restList.count
var counts: Int! = max

class zipResultsViewController: UIViewController {
    
    @IBOutlet weak var imagePane: UIImageView!
    @IBAction func rightBTN(_ sender: Any) {
        self.restName.text = zipViewController.restList[count].name
        self.restAddr.text = zipViewController.restList[count].address
        if (count < max) {
            count += 1
        }
        else {
            count = 0
        }
    }
    @IBAction func leftBTN(_ sender: Any) {
        
        self.restName.text = zipViewController.restList[count].name
        self.restAddr.text = zipViewController.restList[count].address
        if (count > 0) {
            count -= 1
        }
        else {
            count = max - 1
        }
    }
    @IBOutlet weak var backBTN: UIButton!
    override func viewDidLoad() {
        super.viewDidLoad()
        backBTN.layer.cornerRadius = 10
        backBTN.clipsToBounds = true
        self.restName.text = zipViewController.restList[0].name
        self.restAddr.text = zipViewController.restList[0].address
    }
    @IBOutlet weak var restName: UILabel!
    @IBOutlet weak var restAddr: UILabel!
}

