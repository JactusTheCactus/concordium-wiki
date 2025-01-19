def to_base62(num):
    chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    base62 = ""

    while num > 0:
        base62 = chars[num % 62] + base62
        num //= 62
    return base62
def format_base62(num):
    base62_num = to_base62(num)
    # Add separators every 3 characters from the end
    formatted = []
    count = 0
    for char in reversed(base62_num):
        if count and count % 3 == 0:
            formatted.append(",")
        formatted.append(char)
        count += 1
    return "".join(reversed(formatted))
def sasiainput(stat,lower,upper):
  number = upper**2
  print()
  number = int(input(f"Please input {stat} stat(min: {lower}; max: {upper}): "))
  while not lower <= number <= upper:
    number = int(input(f"Try again(min: {lower}; max: {upper}): "))
  if number == 0:
      number = 1
  return number
strength = sasiainput("STR",0,12)
arcane = sasiainput("ARC",0,12)
speed = sasiainput("SPD",0,12)
intelligence = sasiainput("INT",0,12)
alignment = sasiainput("ALN",-6,6)
powerLevel = int(abs(strength * arcane * speed * intelligence * alignment))
powerLevel = format_base62(powerLevel)
print()
print(f"Your Power Level on the S.A.S.I.A. Scale is: <|{powerLevel}|> Strata")