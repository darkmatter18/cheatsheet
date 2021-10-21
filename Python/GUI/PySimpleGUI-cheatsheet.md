# PySimpleGui 

## Minimal example 
<details>
<summary>code</summary>

pip install pysimplegui 
```python
    import PySimpleGUI as sg
    layout = [  [sg.Text('Hello world')] ] 
    window = sg.Window('Window Title', layout)
    while Truee:
        event, values = window.rad()
    window.close()
``` 
</details> 

## [More Elements](https://pysimplegui.readthedocs.io/en/latest/call%20reference/#here-are-all-of-the-elements-the-window-class-and-all-functions)

## Event Handling & Adding data 
<details>
<summary>code</summary>

```python
    import PySimpleGUI as sg
    # In PySimpleGui we just replace our existing window with a new window containing the updated data 
    todos = [] 
    def layoutMethod(): 
        return [[sg.Text("Input your todos: ", size=(30,2), auto_size_text=True)],
                [sg.Input(key='todo-input')],
                *[[sg.Text(text="todo: " + todos[_todo]["source"], size=(30,1), auto_size_text=True)] for _todo in range(len(todos))],
                [sg.Button('Add Todo'), sg.Button('Close')]]

    layout = layoutMethod()
    location = (300, 300)
    windowTitle = 'Todo list' 
    window = sg.Window(windowTitle, location=location).Layout(layout)
    def main(window):
        event, values = window.read()
        if event == sg.WIN_CLOSED or event == 'Close': 
            window.close()
            return 
        if event == "Add Todo": # notice this matches the text inside the button 
            todoDict = {
                "source": values["todo-input"]
            } 
            todos.append(todoDict)
            layout = layoutMethod()
            location = window.CurrentLocation() 
            newWindow = sg.Window(windowTitle, location=location).Layout(layout)
            window.Close()
            window = newWindow
        main(window)
    main(window) 
```
</details>

### [Or](https://pysimplegui.readthedocs.io/en/latest/cookbook/#recipe-pattern-2b-persistent-window-multiple-reads-using-an-event-loop-updates-data-in-window) 
<details>
<summary>code</summary>

```python
    import PySimpleGUI as sg

    sg.theme('BluePurple')

    layout = [[sg.Text('Your typed chars appear here:'), sg.Text(size=(15,1), key='-OUTPUT-')],
            [sg.Input(key='-IN-')],
            [sg.Button('Show'), sg.Button('Exit')]]

    window = sg.Window('Pattern 2B', layout)

    while True:  # Event Loop
        event, values = window.read()
        print(event, values)
        if event == sg.WIN_CLOSED or event == 'Exit':
            break
        if event == 'Show':
            # Update the "output" text element to be the value of "input" element
            window['-OUTPUT-'].update(values['-IN-'])

    window.close()
```
</details> 

## Themes 
### Assigning a theme 
<details>
<summary>code</summary>

```python
    sg.theme('themename')
``` 
</details> 

### Theme previewer 
<details>
<summary>code</summary>

```python
    import PySimpleGUI as sg
    sg.theme_previewer() 
``` 
</details> 

### Custom Themes 
<details>
<summary>code</summary>

```python
themename = {'BACKGROUND': 'DARKBLUE',
                'TEXT': 'BLACK',
                'INPUT': 'RED',
                'TEXT_INPUT': '#000000',
                'SCROLL': '#WHITE',
                'BUTTON': ('white', 'ORANGE'),
                'PROGRESS': ('#01826B', '#D0D0D0'),
                'BORDER': 1,
                'SLIDER_DEPTH': 0,
                'PROGRESS_DEPTH': 0 }

sg.theme_add_new('Athema', athema)
sg.theme('themename') 
``` 
</details> 

## [Prevent console launching with your theme](https://pysimplegui.readthedocs.io/en/latest/cookbook/#recipe-no-console-launching)

