import pygame
pygame.init()
win = pygame.display.set_mode((960,540))
bg = pygame.image.load("bg2.png")
bgX = -960
bgY = 0

def draw(win):
	# win.fill((0,0,0))
	win.blit(bg,(bgX,bgY))
	pygame.display.update()

run = True

while run:
	for event in pygame.event.get():
		if event.type == pygame.QUIT:
			run = False
	keys = pygame.key.get_pressed()
	if keys[pygame.K_LEFT] == True and keys[pygame.K_RIGHT] == False:
		bgX += 1
	elif keys[pygame.K_LEFT] == False and keys[pygame.K_RIGHT] == True: 
		bgX -= 1
	if(bgX > 0):
		bgX = -960 
	if(bgX < -1920):
		bgX = -960
	draw(win)

pygame.quit()


	
