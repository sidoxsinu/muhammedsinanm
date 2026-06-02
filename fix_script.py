import re

with open("index_backup.html", "r", encoding="utf-8") as f:
    backup = f.read()

# Extract the big script block from backup
script_match = re.search(r'<script>\s*document\.addEventListener\("DOMContentLoaded".*?</script>', backup, re.DOTALL)
if script_match:
    good_script = script_match.group(0)
    
    # Let's fix the animation delays in this good script!
    # Decrease duration and delay
    good_script = re.sub(r'duration:\s*1\.5', 'duration: 0.8', good_script)
    good_script = re.sub(r'delay:\s*0\.2', 'delay: 0', good_script)
    good_script = re.sub(r'duration:\s*2', 'duration: 1', good_script)
    good_script = re.sub(r'duration:\s*1,', 'duration: 0.6,', good_script)
    
    with open("index.html", "r", encoding="utf-8") as f:
        current = f.read()
    
    # The current script in index.html is huge due to duplication.
    # We will replace everything from <script>\s*document.addEventListener("DOMContentLoaded" to </script>
    # Wait, the current one might have been modified slightly at the start.
    current_fixed = re.sub(r'<script>\s*document\.addEventListener\("DOMContentLoaded".*?</script>', good_script, current, flags=re.DOTALL)
    
    with open("index.html", "w", encoding="utf-8") as f:
        f.write(current_fixed)
    print("Script restored and delays reduced.")
else:
    print("Could not find script block in backup.")
