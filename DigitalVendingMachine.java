package JDBC.Project;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Scanner;

public class DigitalVendingMachine {
    private static final String url = "jdbc:mysql://localhost:3306/db2";
    private static final String user = "root";
    private static final String password = "Password007";
    public static void main(String[] args) throws ClassNotFoundException, SQLException {
        int coffeeprice = 100;
        int coldrinkprice = 50;
        int waterbottleprice = 20;
        int juiceprice = 60;

        try{
            Class.forName("com.mysql.jdbc.Driver");
        }catch (ClassNotFoundException e){
            System.out.println(e.getMessage());
        }

        try{
            Connection con = DriverManager.getConnection(url,user,password);
            while (true) {
                System.out.println();
                Scanner sc = new Scanner(System.in);
                System.out.println("VENDING MACHINE IS WORKING");
                System.out.println("Select 1 for coffee");
                System.out.println("Select 2 for cold drink");
                System.out.println("Select 3 for  water bottle");
                System.out.println("Select 4 for juice ");
                System.out.println("Option 0: Exit ");
                int choice = sc.nextInt();
                switch (choice) {
                    case 1:
                        coffee(con,sc,coffeeprice);
                        break;
                    case 2:
                        colddrink(con,sc,coldrinkprice);
                        break;
                    case 3:
                        waterbottle(con,sc,waterbottleprice);
                        break;
                    case 4:
                        juice(con,sc,juiceprice);
                        break;
                    case 0:
                        exit();
                        sc.close();
                        return;
                    default:
                        System.out.println("please enter a valid option ");
                }
            }
        }catch (SQLException e){
            System.out.println(e.getMessage());
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

    }

    private static void coffee(Connection con, Scanner sc, int pay) {
        try {
            String query = ("INSERT INTO vendingmachine2 (ITEMBUYED,PRICE ,AMOUNT_PAID) VALUES(?,?,?)");
            System.out.println("Please pay 100 rupees");
            int withdraw = 0;
            int restpay = 0;
            con.setAutoCommit(false);

            try (PreparedStatement ps = con.prepareStatement(query)) {
                pay = sc.nextInt();

                if (pay > 100) {
                    withdraw = pay - 100;
                    restpay = 100;
                    System.out.println("Returning extra amount: " + withdraw);
                    System.out.println(restpay + " deposited");
                } else if (pay < 100) {
                    restpay = pay;
                    withdraw = 100 - pay;
                    System.out.println("Please pay the rest amount: " + withdraw);

                    pay = sc.nextInt();
                    restpay = restpay + pay;

                    if (restpay == 100) {
                        System.out.println(restpay + " deposited");
                    } else if (restpay < 100) {
                        System.out.println("Amount still not sufficient. Payment failed.");
                        con.rollback();
                        return;
                    } else {
                        System.out.println("Extra amount detected. Returning extra: " + (restpay - 100));
                        restpay = 100;
                        System.out.println(restpay + " deposited");
                    }
                } else {
                    restpay = 100;
                    System.out.println(restpay + " deposited");
                }

                ps.setString(1, "coffee");
                ps.setInt(2, 100);
                ps.setInt(3, restpay);
                System.out.println("Here is your coffee");
                System.out.println("Have a nice day");

                int rowsaffected = ps.executeUpdate();
                if (rowsaffected > 0) {
                    con.commit();
                    System.out.println("Payment successful");
                } else {
                    con.rollback();
                    System.out.println("Payment failed");
                }
            }
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
    }


    private static void colddrink(Connection con, Scanner sc, int pay) {
        try {
            String query = ("INSERT INTO vendingmachine2 (ITEMBUYED,PRICE ,AMOUNT_PAID) VALUES(?,?,?)");
            System.out.println("Please pay 100 rupees");
            int withdraw = 0;
            int restpay = 0;
            con.setAutoCommit(false);

            try (PreparedStatement ps = con.prepareStatement(query)) {
                pay = sc.nextInt();

                if (pay > 100) {
                    withdraw = pay - 100;
                    restpay = 100;
                    System.out.println("Returning extra amount: " + withdraw);
                    System.out.println(restpay + " deposited");
                } else if (pay < 100) {
                    restpay = pay;
                    withdraw = 100 - pay;
                    System.out.println("Please pay the rest amount: " + withdraw);

                    pay = sc.nextInt();
                    restpay = restpay + pay;

                    if (restpay == 100) {
                        System.out.println(restpay + " deposited");
                    } else if (restpay < 100) {
                        System.out.println("Amount still not sufficient. Payment failed.");
                        con.rollback();
                        return;
                    } else {
                        System.out.println("Extra amount detected. Returning extra: " + (restpay - 100));
                        restpay = 100;
                        System.out.println(restpay + " deposited");
                    }
                } else {
                    restpay = 100;
                    System.out.println(restpay + " deposited");
                }

                ps.setString(1, "colddrink");
                ps.setInt(2, 100);
                ps.setInt(3, restpay);
                System.out.println("Here is your colddrink");
                System.out.println("Have a nice day");

                int rowsaffected = ps.executeUpdate();
                if (rowsaffected > 0) {
                    con.commit();
                    System.out.println("Payment successful");
                } else {
                    con.rollback();
                    System.out.println("Payment failed");
                }
            }
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
    }

    private static void waterbottle(Connection con, Scanner sc, int pay) {
        try {
            String query = ("INSERT INTO vendingmachine2 (ITEMBUYED,PRICE ,AMOUNT_PAID) VALUES(?,?,?)");
            System.out.println("Please pay 100 rupees");
            int withdraw = 0;
            int restpay = 0;
            con.setAutoCommit(false);

            try (PreparedStatement ps = con.prepareStatement(query)) {
                pay = sc.nextInt();

                if (pay > 100) {
                    withdraw = pay - 100;
                    restpay = 100;
                    System.out.println("Returning extra amount: " + withdraw);
                    System.out.println(restpay + " deposited");
                } else if (pay < 100) {
                    restpay = pay;
                    withdraw = 100 - pay;
                    System.out.println("Please pay the rest amount: " + withdraw);

                    pay = sc.nextInt();
                    restpay = restpay + pay;

                    if (restpay == 100) {
                        System.out.println(restpay + " deposited");
                    } else if (restpay < 100) {
                        System.out.println("Amount still not sufficient. Payment failed.");
                        con.rollback();
                        return;
                    } else {
                        System.out.println("Extra amount detected. Returning extra: " + (restpay - 100));
                        restpay = 100;
                        System.out.println(restpay + " deposited");
                    }
                } else {
                    restpay = 100;
                    System.out.println(restpay + " deposited");
                }

                ps.setString(1, "waterbottle");
                ps.setInt(2, 100);
                ps.setInt(3, restpay);
                System.out.println("Here is your waterbottle");
                System.out.println("Have a nice day");

                int rowsaffected = ps.executeUpdate();
                if (rowsaffected > 0) {
                    con.commit();
                    System.out.println("Payment successful");
                } else {
                    con.rollback();
                    System.out.println("Payment failed");
                }
            }
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
    }

    private static void juice(Connection con, Scanner sc, int pay) {
        try {
            String query = ("INSERT INTO vendingmachine2 (ITEMBUYED,PRICE ,AMOUNT_PAID) VALUES(?,?,?)");
            System.out.println("Please pay 100 rupees");
            int withdraw = 0;
            int restpay = 0;
            con.setAutoCommit(false);

            try (PreparedStatement ps = con.prepareStatement(query)) {
                pay = sc.nextInt();

                if (pay > 100) {
                    withdraw = pay - 100;
                    restpay = 100;
                    System.out.println("Returning extra amount: " + withdraw);
                    System.out.println(restpay + " deposited");
                } else if (pay < 100) {
                    restpay = pay;
                    withdraw = 100 - pay;
                    System.out.println("Please pay the rest amount: " + withdraw);

                    pay = sc.nextInt();
                    restpay = restpay + pay;

                    if (restpay == 100) {
                        System.out.println(restpay + " deposited");
                    } else if (restpay < 100) {
                        System.out.println("Amount still not sufficient. Payment failed.");
                        con.rollback();
                        return;
                    } else {
                        System.out.println("Extra amount detected. Returning extra: " + (restpay - 100));
                        restpay = 100;
                        System.out.println(restpay + " deposited");
                    }
                } else {
                    restpay = 100;
                    System.out.println(restpay + " deposited");
                }

                ps.setString(1, "juice");
                ps.setInt(2, 100);
                ps.setInt(3, restpay);
                System.out.println("Here is your juice");
                System.out.println("Have a nice day");

                int rowsaffected = ps.executeUpdate();
                if (rowsaffected > 0) {
                    con.commit();
                    System.out.println("Payment successful");
                } else {
                    con.rollback();
                    System.out.println("Payment failed");
                }
            }
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
    }

    public static void exit() throws InterruptedException {
        System.out.print("vending machine exiting");
        int i = 5;
        while(i!=0){
            System.out.print(".");
            Thread.sleep(1000);
            i--;
        }
        System.out.println();
        System.out.println("ThankYou ");
    }
}
