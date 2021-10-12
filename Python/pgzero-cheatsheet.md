# PGZero 

## Minimal example 
<details open>
<summary>code</summary>

```python
    # images/actorname.png 
    actorname = Actor('actorname')
    actorname.pos = 100, 56
    WIDTH = 500
    HEIGHT = actorname.height + 20
    def draw():
        screen.clear()
        actorname.draw()
    
    def update():
        actorname.left += 2
        if actorname.left > WIDTH:
            actorname.right = 0
```
</details>

## Text 
<details>
<summary>code</summary>

```python
    screen.draw.text("hello gamedev", (x_pos, y_pos),fontname="helvetica", fontsize=40, color=(red,green,blue), shadow=(2,2), scolor=(red,green,blue))
``` 
</details>

## [Input](https://pygame-zero.readthedocs.io/en/stable/hooks.html#event-handling-hooks) | [Keyboard](https://pygame-zero.readthedocs.io/en/1.1/builtins.html#the-keyboard)
<details>
<summary>code</summary>

```python
    def on_mouse_down():
    print("Mouse button clicked")

    def on_mouse_down(pos):
        print("Mouse button clicked at", pos)

    def on_mouse_down(button):
        print("Mouse button", button, "clicked")

    def on_mouse_down(pos, button):
        print("Mouse button", button, "clicked at", pos)

    def on_mouse_move(pos):
        print(pos)
    
   def update():
	if (keyboard.right):
		print("right") 
	
	if (keyboard.space):
		print("space") 
 
``` 
</details>

## Collisions 
<details>
<summary>code</summary>

```python
    collidable = Actor('actorname')
    collidable.pos = 100, 56

    def update():
        if actorname.collidepoint(collidable.pos):
            print("Ouch")
``` 
</details>

## Sounds 
<details>
<summary>code</summary>

```python
    # sounds/soundname.wav 
    sounds.soundname.play() # plays 1ce 
    sounds.soundname.play(7) # plays seven times   
    sounds.soundname.play(-1) # loops forever 
    sounds.soundname.stop()
    sounds.soundname.get_length() # duration in seconds 

    # music/track.mp3 
    music.play('track') 
    music.play_once('track') # can use on_music_end() hook 
    music.queue('track') 
    music.stop() 
    music.pause() 
    music.unpause()
    music.is_playing() # returns true if music is playing 
    music.fadeout(0.5) # where 0.5 is the duration 
    music.set_volume(0.5) # 0 being no volume & 1 being full volume 
    music.get_volume() 

    tonename = tone.create('C1', 0.8)
    tonename.play()
```
</details>
