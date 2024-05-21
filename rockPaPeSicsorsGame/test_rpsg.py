import unittest
from rpsg import game_logic

class TestRPSG(unittest.TestCase):
    def test_game_logic(self):
        # ... outros testes ...

        # Teste com uma string vazia
        self.assertEqual(game_logic("", "rock"), "Invalid choice! Please try again.")

        # Teste com uma string muito longa
        self.assertEqual(game_logic("a" * 1000, "rock"), "Invalid choice! Please try again.")

        # Teste com caracteres especiais
        self.assertEqual(game_logic("@#$%", "rock"), "Invalid choice! Please try again.")

        # Teste com números
        self.assertEqual(game_logic("123", "rock"), "Invalid choice! Please try again.")

        # Teste com None
        self.assertEqual(game_logic(None, "rock"), "Invalid choice! Please try again.")

if __name__ == '__main__':
    unittest.main()