# create a simple rock, paper, sicssors game
# provide a welcome message
# get the user´s choice
# get the computer´s choice
# compare the two choices
# print the results
# ask the user if they want to play again
# say goodbye and end the game
# use one function for the game logic

import random

def game_logic(user_choice, computer_choice):
    if user_choice == computer_choice:
        return "It´s a tie!"
    elif user_choice == "rock":
        if computer_choice == "paper":
            return "Computer wins!"
        else:
            return "You win!"
    elif user_choice == "paper":
        if computer_choice == "scissors":
            return "Computer wins!"
        else:
            return "You win!"
    elif user_choice == "scissors":
        if computer_choice == "rock":
            return "Computer wins!"
        else:
            return "You win!"
    else:
        return "Invalid choice! Please try again."

def rpsg():
    print("Welcome to the Rock, Paper, Scissors Game!")
    user_choice = input("Please choose rock, paper or scissors: ")
    computer_choice = random.choice(["rock", "paper", "scissors"])
    result = game_logic(user_choice, computer_choice)
    print(result)
    play_again = input("Do you want to play again? (yes/no): ")
    if play_again == "yes":
        rpsg()
    else:
        print("Goodbye!")   

rpsg()