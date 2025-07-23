
import javax.swing.*;
import javax.swing.border.EmptyBorder;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class test extends JFrame {
    private static final String url = "jdbc:mysql://localhost:3306/db2";
    private static final String user = "root";
    private static final String password = "Password007";

    private final int coffeeprice = 100;
    private final int coldrinkprice = 50;
    private final int waterbottleprice = 20;
    private final int juiceprice = 60;

    private JPanel mainPanel;
    private JPanel selectionPanel;
    private JPanel paymentPanel;
    private JPanel additionalPaymentPanel;
    private JPanel successPanel;
    private JPanel exitPanel;
    private JPanel transactionPanel;

    private JTextField paymentField;
    private JTextField additionalPaymentField;
    private JTextArea messageArea;
    private JTextArea transactionArea;

    private String selectedProduct;
    private int selectedPrice;
    private int totalPaid = 0;
    private int change = 0;
    private Connection connection;
    private List<String> transactions = new ArrayList<>();

    public test() {
        setTitle("Digital Vending Machine");
        setSize(800, 600);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);

        // Initialize database connection
        try {
            Class.forName("com.mysql.jdbc.Driver");
            connection = DriverManager.getConnection(url, user, password);
        } catch (ClassNotFoundException | SQLException e) {
            JOptionPane.showMessageDialog(this, "Database connection error: " + e.getMessage(),
                    "Error", JOptionPane.ERROR_MESSAGE);
        }

        // Create main panel with card layout
        mainPanel = new JPanel(new CardLayout());

        // Create all panels
        createSelectionPanel();
        createPaymentPanel();
        createAdditionalPaymentPanel();
        createSuccessPanel();
        createExitPanel();
        createTransactionPanel();

        // Add panels to main panel
        mainPanel.add(selectionPanel, "selection");
        mainPanel.add(paymentPanel, "payment");
        mainPanel.add(additionalPaymentPanel, "additional");
        mainPanel.add(successPanel, "success");
        mainPanel.add(exitPanel, "exit");

        // Create split pane for main content and transactions
        JSplitPane splitPane = new JSplitPane(JSplitPane.HORIZONTAL_SPLIT, mainPanel, transactionPanel);
        splitPane.setDividerLocation(500);
        add(splitPane);

        // Show selection panel initially
        showPanel("selection");
    }

    private void createSelectionPanel() {
        selectionPanel = new JPanel(new BorderLayout());
        selectionPanel.setBorder(new EmptyBorder(20, 20, 20, 20));

        JLabel titleLabel = new JLabel("VENDING MACHINE IS WORKING", JLabel.CENTER);
        titleLabel.setFont(new Font("Arial", Font.BOLD, 24));
        selectionPanel.add(titleLabel, BorderLayout.NORTH);

        JPanel productsPanel = new JPanel(new GridLayout(2, 2, 10, 10));

        JButton coffeeButton = createProductButton("Coffee", coffeeprice);
        JButton colddrinkButton = createProductButton("Cold Drink", coldrinkprice);
        JButton waterButton = createProductButton("Water Bottle", waterbottleprice);
        JButton juiceButton = createProductButton("Juice", juiceprice);

        productsPanel.add(coffeeButton);
        productsPanel.add(colddrinkButton);
        productsPanel.add(waterButton);
        productsPanel.add(juiceButton);

        selectionPanel.add(productsPanel, BorderLayout.CENTER);

        JButton exitButton = new JButton("Exit (Option 0)");
        exitButton.setBackground(new Color(220, 53, 69));
        exitButton.setForeground(Color.WHITE);
        exitButton.addActionListener(e -> exit());

        selectionPanel.add(exitButton, BorderLayout.SOUTH);
    }

    private JButton createProductButton(String name, int price) {
        JButton button = new JButton("<html><center>" + name + "<br>₹" + price + "</center></html>");
        button.setFont(new Font("Arial", Font.PLAIN, 16));
        button.setPreferredSize(new Dimension(150, 100));

        button.addActionListener(e -> {
            selectedProduct = name.toLowerCase().replace(" ", "");
            selectedPrice = price;
            messageArea.setText("Please pay " + price + " rupees");
            paymentField.setText("");
            totalPaid = 0;
            change = 0;
            showPanel("payment");
        });

        return button;
    }

    private void createPaymentPanel() {
        paymentPanel = new JPanel(new BorderLayout());
        paymentPanel.setBorder(new EmptyBorder(20, 20, 20, 20));

        JPanel topPanel = new JPanel(new BorderLayout());
        JLabel titleLabel = new JLabel("Payment", JLabel.CENTER);
        titleLabel.setFont(new Font("Arial", Font.BOLD, 20));
        topPanel.add(titleLabel, BorderLayout.NORTH);

        messageArea = new JTextArea(4, 20);
        messageArea.setEditable(false);
        messageArea.setLineWrap(true);
        messageArea.setWrapStyleWord(true);
        messageArea.setFont(new Font("Arial", Font.PLAIN, 14));
        messageArea.setBorder(BorderFactory.createLineBorder(Color.LIGHT_GRAY));
        topPanel.add(new JScrollPane(messageArea), BorderLayout.CENTER);

        paymentPanel.add(topPanel, BorderLayout.NORTH);

        JPanel centerPanel = new JPanel(new FlowLayout());
        JLabel paymentLabel = new JLabel("Enter Payment Amount (₹): ");
        paymentField = new JTextField(10);
        centerPanel.add(paymentLabel);
        centerPanel.add(paymentField);

        paymentPanel.add(centerPanel, BorderLayout.CENTER);

        JPanel buttonPanel = new JPanel(new FlowLayout());
        JButton payButton = new JButton("Pay");
        payButton.addActionListener(e -> processPayment());

        JButton cancelButton = new JButton("Cancel");
        cancelButton.addActionListener(e -> showPanel("selection"));

        buttonPanel.add(payButton);
        buttonPanel.add(cancelButton);

        paymentPanel.add(buttonPanel, BorderLayout.SOUTH);
    }

    private void createAdditionalPaymentPanel() {
        additionalPaymentPanel = new JPanel(new BorderLayout());
        additionalPaymentPanel.setBorder(new EmptyBorder(20, 20, 20, 20));

        JPanel topPanel = new JPanel(new BorderLayout());
        JLabel titleLabel = new JLabel("Additional Payment Required", JLabel.CENTER);
        titleLabel.setFont(new Font("Arial", Font.BOLD, 20));
        topPanel.add(titleLabel, BorderLayout.NORTH);

        JTextArea additionalMessageArea = new JTextArea(4, 20);
        additionalMessageArea.setEditable(false);
        additionalMessageArea.setLineWrap(true);
        additionalMessageArea.setWrapStyleWord(true);
        additionalMessageArea.setFont(new Font("Arial", Font.PLAIN, 14));
        additionalMessageArea.setBorder(BorderFactory.createLineBorder(Color.LIGHT_GRAY));
        topPanel.add(new JScrollPane(additionalMessageArea), BorderLayout.CENTER);

        additionalPaymentPanel.add(topPanel, BorderLayout.NORTH);

        JPanel centerPanel = new JPanel(new FlowLayout());
        JLabel additionalPaymentLabel = new JLabel("Enter Additional Payment (₹): ");
        additionalPaymentField = new JTextField(10);
        centerPanel.add(additionalPaymentLabel);
        centerPanel.add(additionalPaymentField);

        additionalPaymentPanel.add(centerPanel, BorderLayout.CENTER);

        JPanel buttonPanel = new JPanel(new FlowLayout());
        JButton payButton = new JButton("Pay Additional");
        payButton.addActionListener(e -> processAdditionalPayment());

        JButton cancelButton = new JButton("Cancel");
        cancelButton.addActionListener(e -> showPanel("selection"));

        buttonPanel.add(payButton);
        buttonPanel.add(cancelButton);

        additionalPaymentPanel.add(buttonPanel, BorderLayout.SOUTH);
    }

    private void createSuccessPanel() {
        successPanel = new JPanel(new BorderLayout());
        successPanel.setBorder(new EmptyBorder(20, 20, 20, 20));

        JPanel topPanel = new JPanel(new BorderLayout());
        JLabel titleLabel = new JLabel("Transaction Complete", JLabel.CENTER);
        titleLabel.setFont(new Font("Arial", Font.BOLD, 20));
        topPanel.add(titleLabel, BorderLayout.NORTH);

        JTextArea successMessageArea = new JTextArea(4, 20);
        successMessageArea.setEditable(false);
        successMessageArea.setLineWrap(true);
        successMessageArea.setWrapStyleWord(true);
        successMessageArea.setFont(new Font("Arial", Font.PLAIN, 14));
        successMessageArea.setBorder(BorderFactory.createLineBorder(Color.LIGHT_GRAY));
        topPanel.add(new JScrollPane(successMessageArea), BorderLayout.CENTER);

        successPanel.add(topPanel, BorderLayout.NORTH);

        JButton anotherPurchaseButton = new JButton("Make Another Purchase");
        anotherPurchaseButton.addActionListener(e -> showPanel("selection"));

        successPanel.add(anotherPurchaseButton, BorderLayout.SOUTH);
    }

    private void createExitPanel() {
        exitPanel = new JPanel(new BorderLayout());
        exitPanel.setBorder(new EmptyBorder(20, 20, 20, 20));

        JTextArea exitMessageArea = new JTextArea(4, 20);
        exitMessageArea.setEditable(false);
        exitMessageArea.setLineWrap(true);
        exitMessageArea.setWrapStyleWord(true);
        exitMessageArea.setFont(new Font("Arial", Font.BOLD, 18));
        exitMessageArea.setBorder(BorderFactory.createLineBorder(Color.LIGHT_GRAY));
        exitMessageArea.setAlignmentX(JLabel.CENTER);

        exitPanel.add(new JScrollPane(exitMessageArea), BorderLayout.CENTER);
    }

    private void createTransactionPanel() {
        transactionPanel = new JPanel(new BorderLayout());
        transactionPanel.setBorder(new EmptyBorder(10, 10, 10, 10));

        JLabel titleLabel = new JLabel("Transaction History", JLabel.CENTER);
        titleLabel.setFont(new Font("Arial", Font.BOLD, 18));
        transactionPanel.add(titleLabel, BorderLayout.NORTH);

        transactionArea = new JTextArea(20, 20);
        transactionArea.setEditable(false);
        transactionArea.setFont(new Font("Monospaced", Font.PLAIN, 12));

        JScrollPane scrollPane = new JScrollPane(transactionArea);
        transactionPanel.add(scrollPane, BorderLayout.CENTER);
    }

    private void showPanel(String panelName) {
        CardLayout cl = (CardLayout) mainPanel.getLayout();
        cl.show(mainPanel, panelName);
    }

    private void processPayment() {
        try {
            int payment = Integer.parseInt(paymentField.getText().trim());
            if (payment <= 0) {
                JOptionPane.showMessageDialog(this, "Please enter a valid amount",
                        "Error", JOptionPane.ERROR_MESSAGE);
                return;
            }

            if (payment > selectedPrice) {
                change = payment - selectedPrice;
                totalPaid = selectedPrice;
                messageArea.setText("Returning extra amount: " + change + "\n" +
                        selectedPrice + " deposited");
                completeTransaction();
            } else if (payment < selectedPrice) {
                totalPaid = payment;
                int remaining = selectedPrice - payment;
                messageArea.setText("Please pay the rest amount: " + remaining);
                additionalPaymentField.setText("");
                showPanel("additional");
            } else {
                totalPaid = selectedPrice;
                messageArea.setText(selectedPrice + " deposited");
                completeTransaction();
            }
        } catch (NumberFormatException e) {
            JOptionPane.showMessageDialog(this, "Please enter a valid number",
                    "Error", JOptionPane.ERROR_MESSAGE);
        }
    }

    private void processAdditionalPayment() {
        try {
            int additionalPayment = Integer.parseInt(additionalPaymentField.getText().trim());
            if (additionalPayment <= 0) {
                JOptionPane.showMessageDialog(this, "Please enter a valid amount",
                        "Error", JOptionPane.ERROR_MESSAGE);
                return;
            }

            int newTotal = totalPaid + additionalPayment;

            if (newTotal < selectedPrice) {
                messageArea.setText("Amount still not sufficient. Payment failed.");
                Timer timer = new Timer(2000, e -> showPanel("selection"));
                timer.setRepeats(false);
                timer.start();
                return;
            } else if (newTotal > selectedPrice) {
                change = newTotal - selectedPrice;
                totalPaid = selectedPrice;
                messageArea.setText("Extra amount detected. Returning extra: " + change + "\n" +
                        selectedPrice + " deposited");
            } else {
                totalPaid = selectedPrice;
                messageArea.setText(selectedPrice + " deposited");
            }

            completeTransaction();
        } catch (NumberFormatException e) {
            JOptionPane.showMessageDialog(this, "Please enter a valid number",
                    "Error", JOptionPane.ERROR_MESSAGE);
        }
    }

    private void completeTransaction() {
        try {
            String query = "INSERT INTO vendingmachine2 (ITEMBUYED, PRICE, AMOUNT_PAID) VALUES(?, ?, ?)";
            connection.setAutoCommit(false);

            try (PreparedStatement ps = connection.prepareStatement(query)) {
                ps.setString(1, selectedProduct);
                ps.setInt(2, selectedPrice);
                ps.setInt(3, totalPaid);

                int rowsAffected = ps.executeUpdate();
                if (rowsAffected > 0) {
                    connection.commit();
                    String successMessage = "Here is your " + selectedProduct + "\n" +
                            "Have a nice day\n" +
                            "Payment successful";
                    if (change > 0) {
                        successMessage += "\nChange returned: " + change;
                    }

                    JTextArea successMessageArea = (JTextArea) ((JScrollPane) ((JPanel) successPanel.getComponent(0)).getComponent(1)).getViewport().getView();
                    successMessageArea.setText(successMessage);

                    // Add to transaction history
                    String transaction = "Item: " + selectedProduct +
                            "\nPrice: ₹" + selectedPrice +
                            "\nPaid: ₹" + totalPaid +
                            "\nTime: " + java.time.LocalDateTime.now().toString() +
                            "\n------------------------\n";
                    transactions.add(transaction);
                    updateTransactionHistory();

                    showPanel("success");
                } else {
                    connection.rollback();
                    JOptionPane.showMessageDialog(this, "Payment failed",
                            "Error", JOptionPane.ERROR_MESSAGE);
                    showPanel("selection");
                }
            }
        } catch (SQLException e) {
            try {
                connection.rollback();
            } catch (SQLException ex) {
                ex.printStackTrace();
            }
            JOptionPane.showMessageDialog(this, "Database error: " + e.getMessage(),
                    "Error", JOptionPane.ERROR_MESSAGE);
        }
    }

    private void updateTransactionHistory() {
        StringBuilder sb = new StringBuilder();
        for (int i = transactions.size() - 1; i >= 0; i--) {
            sb.append(transactions.get(i));
        }
        transactionArea.setText(sb.toString());
    }

    private void exit() {
        JTextArea exitMessageArea = (JTextArea) ((JScrollPane) exitPanel.getComponent(0)).getViewport().getView();
        exitMessageArea.setText("Vending machine exiting");
        showPanel("exit");

        new Thread(() -> {
            try {
                for (int i = 1; i <= 5; i++) {
                    final String dots = ".".repeat(i);
                    SwingUtilities.invokeLater(() ->
                            exitMessageArea.setText("Vending machine exiting" + dots));
                    Thread.sleep(1000);
                }
                SwingUtilities.invokeLater(() -> {
                    exitMessageArea.setText("ThankYou");
                    Timer timer = new Timer(2000, e -> showPanel("selection"));
                    timer.setRepeats(false);
                    timer.start();
                });
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }).start();
    }

    public static void main(String[] args) {
        try {
            UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());
        } catch (Exception e) {
            e.printStackTrace();
        }

        SwingUtilities.invokeLater(() -> {
           test gui = new test();
            gui.setVisible(true);
        });
    }
}
