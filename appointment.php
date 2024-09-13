<?php
$conn = mysqli_connect('localhost','root','','contact_db') or die('connection failed');

if(isset($_POST['submit'])){

   $name = mysqli_real_escape_string($conn, $_POST['name']);
   $email = mysqli_real_escape_string($conn, $_POST['email']);
   $number = $_POST['number'];
   $date = $_POST['date'];

   $insert = mysqli_query($conn, "INSERT INTO `contact_form`(name, email, number, date) VALUES('$name','$email','$number','$date')") or die('query failed');

   if($insert){
      $message[] = 'Appointment made successfully!';
   } else {
      $message[] = 'Appointment failed';
   }

}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mental Health - Appointment</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <link rel="stylesheet" href="style.css">
    <script defer src="script.js"></script>
</head>
<body>
    <header class="header">
        <a href="index.html" class="logo">
            <i class="fas fa-brain"></i> MindEase
        </a>
        <nav class="navbar">
            <a href="home.html">Home</a>
            <a href="about.html">About</a>
            <a href="doctor.html">Doctors</a>
            <a href="appointment.php">Appointment</a>
            <a href="blog.html">Blogs</a>
        </nav>
        <button id="menu-btn" class="fas fa-bars" aria-label="Menu"></button>
    </header>

    <section class="appointment" id="appointment">
        <h1 class="heading"><span>Appointment</span> Now</h1>
        <div class="row">
            <div class="image-container">
                <img src="image/appointment.jpg" alt="Appointment Image">
            </div>

            <form id="appointment-form" action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post">
                <?php
                    if(isset($message)) {
                        foreach($message as $msg) {
                            echo '<p class="message">' . $msg . '</p>';
                        }
                    }
                ?>
                <h3>Make an Appointment</h3>
                <input type="text" name="name" placeholder="Your Name" class="box" required>
                <input type="number" name="number" placeholder="Your Number" class="box" required>
                <input type="email" name="email" placeholder="Your Email" class="box" required>
                <input type="date" name="date" class="box" required>
                <input type="submit" name="submit" value="Make Appointment" class="btn">
            </form>
        </div>
    </section>

    <footer class="footer">
        <div class="footer-content">
            <div class="quick-links">
                <h4>Quick Links</h4>
                <a href="home.html">Home</a>
                <a href="about.html">About</a>
                <a href="doctor.html">Doctors</a>
                <a href="appointment.php">Appointment</a>
                <a href="blog.html">Blogs</a>
            </div>
            <div class="contact-info">
                <h4>Contact Us</h4>
                <p><i class="fas fa-phone-alt"></i> +1-234-567-890</p>
                <p><i class="fas fa-envelope"></i> contact@mindease.com</p>
                <p><i class="fas fa-map-marker-alt"></i> Koteshwor, Kathmandu, ST 35</p>
            </div>
            <div class="social-media">
                <h4>Follow Us</h4>
                <a href="https://instagram.com/mindease" target="_blank"><i class="fab fa-instagram"></i> Instagram</a>
                <a href="https://facebook.com/mindease" target="_blank"><i class="fab fa-facebook-f"></i> Facebook</a>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2024 MindEase. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>
