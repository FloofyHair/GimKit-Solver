import pyautogui
import pytesseract as tess
import numpy as np
import time
import keyboard
from PIL import Image,  ImageOps

tess.pytesseract.tesseract_cmd=r'C:\Users\theod\AppData\Local\Tesseract-OCR\tesseract.exe'

question = None
answers = {}
red = (229, 84, 84)
green = (56, 142, 60)
blue = (66, 82, 175)
light_blue = (48, 63, 159)

def getData(app_title): #gets page image and does some post processing to it
    page = None # page we are currently on
    global x, y
    try:
        # Find the coordinates of the app window
        app = pyautogui.getWindowsWithTitle(app_title)[0]
        x, y, width, height = app.left+75, app.top+350, app.width-100, app.height-400

        # Take a screenshot of the app window
        im = pyautogui.screenshot(region=(x, y, width, height))

        #look at what page we are on (Questions, Win, Lose)
        #im.save("OCRSolve/im.png")
        width, height = im.size

        pixel = im.getpixel((0, 0))
        if pixel == red:
            page = "Lose"
        if pixel == green:
            page = "Win"
        if pixel == blue or pixel == light_blue:
            page = "Question"

        #Image manipulation for text identification
        im = ImageOps.grayscale(im)
        im = ImageOps.invert(im)
        #im.save("OCRSolve/im_grayscale.png")
        img = np.array(im) #turn image into numpy array
        img[img >= 10] = 255 # Replace all non-black pixels with white
        im = Image.fromarray(img) #turn array backminto image
        #im.save("OCRSolve/im_modified.png") # Save the processed image

        if page == "Win":
            return "W", im
        elif page == "Lose":
            return "D", im
        elif page == "Question":
            return "Q", im
        else:
            return "N/A"
    except IndexError:
        return "App not found!"

def getAnswer(question):
    global answers
    try:
        return answers[question]
    except:
        return None

def addAnswer(question, answer):
    global answers
    try: print(answers[question])
    except:
        print("Added to List:", question, ":", answer)
        answers[question] = answer
        
def toggle_run():
    global run 
    if run == False:
        run = True
        print("<<RESUMED>>")
    else:
        run = False
        print("<<PAUSED>>")
keyboard.add_hotkey('esc', toggle_run)

past_text = []
run = True
i = 0 
while True:
    if run == True:
        data = getData("Opera")

        if data[0] == "Q": #Question
            text = []
            im = data[1]
            width, height = im.size
            im_question = im.crop((0, 0, width, height/3))
            im_answer1 = im.crop((0, height/3, width/2, height*2/3))
            im_answer2 = im.crop((0, height*2/3, width/2, height))
            im_answer3 = im.crop((width/2, height/3, width, height*2/3))
            im_answer4 = im.crop((width/2, height*2/3, width, height))
            q = tess.pytesseract.image_to_string(im_question).strip("\n")
            if q != "":
                question = q
            text.append(tess.pytesseract.image_to_string(im_answer1).strip("\n"))
            text.append(tess.pytesseract.image_to_string(im_answer2).strip("\n"))
            text.append(tess.pytesseract.image_to_string(im_answer3).strip("\n"))
            text.append(tess.pytesseract.image_to_string(im_answer4).strip("\n"))
            print(text)

            if text[0] != "":
                past_text = text
            try:
                move_location = None
                answer = getAnswer(question)
                answer_index = text.index(answer)+1
                if answer_index == 1:
                    move_location = (x+width/4, y+height/2)
                if answer_index == 2:
                    move_location = (x+width/4, y+height*(3/4))
                if answer_index == 3:
                    move_location = (x+width*(3/4), y+height/2)
                if answer_index == 4:
                    move_location = (x+width*(3/4), y+height*(3/4))
                if move_location:
                    pyautogui.moveTo(move_location)
                    pyautogui.click()
                    time.sleep(0.5)
            except Exception as e:
                pass


        elif data[0] == "W": #Win
            width, height = data[1].size
            answer_pos = pyautogui.position()
            if answer_pos.x > x+0 and answer_pos.x < x+width/2 and answer_pos.y > y+height/3 and answer_pos.y < y+height*2/3:
                a = 0
            if answer_pos.x > x+0 and answer_pos.x < x+width/2 and answer_pos.y > y+height*2/3 and answer_pos.y < y+height:
                a = 1
            if answer_pos.x > x+width/2 and answer_pos.x < x+width and answer_pos.y > y+height/3 and answer_pos.y < y+height*2/3:
                a = 2
            if answer_pos.x > x+width/2 and answer_pos.x < x+width and answer_pos.y > y+height*2/3 and answer_pos.y < y+height:
                a = 3
            print(past_text)
            addAnswer(question, past_text[a])

            pyautogui.moveTo(x+width/2, y+height*(3/4))
            pyautogui.click()
            time.sleep(0.05)


        elif data[0] == "D": #Die
            time.sleep(2.5)
            data = getData("Opera")
            text = tess.pytesseract.image_to_string(data[1])
            answer = text.split("\n")[0]
            addAnswer(question, answer)
            width, height = data[1].size
            pyautogui.moveTo(x+width/2, y+height*(3/4))
            pyautogui.click()
            time.sleep(0.05)
            pass
        else:
            print("none")